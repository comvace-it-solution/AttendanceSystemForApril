import { apiRequest } from './apiClient'
import type {
  AttendanceStatus,
  AttendanceUser,
  DashboardData,
  FetchAttendanceListResponse,
  FetchEmployeesResponse,
  PunchAction,
} from '../types/attendance'

type EmployeeApiUser = {
  id: number
  userName: string
  email: string
  currentAttendanceState: 1 | 2 | null
  currentAttendanceId: number | null
}

type UsersApiResponse = {
  users: EmployeeApiUser[]
}

type AttendanceApiBreak = {
  id: number
  breakStartDt: string | null
  breakEndDt: string | null
}

type AttendanceApiRecord = {
  id: number
  workDate: string
  workStartDt: string | null
  workEndDt: string | null
  breaks: AttendanceApiBreak[]
}

type AttendanceRecordsApiResponse = {
  userId: number
  targetMonth: string
  attendanceRecords: AttendanceApiRecord[]
}

const getTargetMonth = () => {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')

  return `${now.getFullYear()}-${month}`
}

const formatTime = (value: string | null) => {
  if (!value) {
    return null
  }

  return new Intl.DateTimeFormat('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(value))
}

const getDiffMinutes = (start: string, end: string) => {
  const diffMs = new Date(end).getTime() - new Date(start).getTime()

  return Math.max(0, Math.floor(diffMs / 60000))
}

const formatMinutes = (minutes: number) => {
  const safeMinutes = Math.max(0, minutes)
  const hours = Math.floor(safeMinutes / 60)
  const remainder = safeMinutes % 60

  return `${String(hours).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
}

const isSameLocalDate = (value: string | null, baseDate: Date) => {
  if (!value) {
    return false
  }

  const date = new Date(value)

  return (
    date.getFullYear() === baseDate.getFullYear() &&
    date.getMonth() === baseDate.getMonth() &&
    date.getDate() === baseDate.getDate()
  )
}

const getTodayRecord = (records: AttendanceApiRecord[]) => {
  return records.find((record) => isSameLocalDate(record.workStartDt, new Date())) ?? null
}

const getLatestRecord = (records: AttendanceApiRecord[]) => {
  return [...records].sort((a, b) => b.id - a.id)[0] ?? null
}

const toAttendanceStatus = (
  currentAttendanceState: 1 | 2 | null,
  latestWorkEndDt: string | null,
): AttendanceStatus => {
  if (currentAttendanceState === 1) {
    return '勤務中'
  }

  if (currentAttendanceState === 2) {
    return '休憩中'
  }

  return isSameLocalDate(latestWorkEndDt, new Date()) ? '退勤済み' : '出勤前'
}

const getLatestBreak = (record: AttendanceApiRecord | null) => {
  return [...(record?.breaks ?? [])].sort((a, b) => b.id - a.id)[0] ?? null
}

const calculateBreakMinutes = (
  breaks: AttendanceApiBreak[],
  currentAttendanceState: 1 | 2 | null,
) => {
  const now = new Date().toISOString()

  return breaks.reduce((total, row) => {
    if (!row.breakStartDt) {
      return total
    }

    if (row.breakEndDt) {
      return total + getDiffMinutes(row.breakStartDt, row.breakEndDt)
    }

    if (currentAttendanceState === 2) {
      return total + getDiffMinutes(row.breakStartDt, now)
    }

    return total
  }, 0)
}

const calculateWorkedMinutes = (
  record: AttendanceApiRecord | null,
  currentAttendanceState: 1 | 2 | null,
) => {
  if (!record?.workStartDt) {
    return 0
  }

  const endReference =
    record.workEndDt ??
    (currentAttendanceState === 1 || currentAttendanceState === 2
      ? new Date().toISOString()
      : null)

  if (!endReference) {
    return 0
  }

  return Math.max(
    0,
    getDiffMinutes(record.workStartDt, endReference) -
      calculateBreakMinutes(record.breaks, currentAttendanceState),
  )
}

const fetchUsers = async () => {
  const response = await apiRequest<UsersApiResponse>('/users')

  return response.users
}

const fetchAttendanceRecords = async (userId: number) => {
  const query = new URLSearchParams({
    userId: String(userId),
    targetMonth: getTargetMonth(),
  })

  return apiRequest<AttendanceRecordsApiResponse>(`/attendance/records?${query.toString()}`)
}

export const fetchEmployees = async (): Promise<FetchEmployeesResponse> => {
  const users = await fetchUsers()

  return users.map((user) => ({
    userId: String(user.id),
    userName: user.userName,
  }))
}

const fetchAttendanceListByUsers = async (
  users: EmployeeApiUser[],
): Promise<FetchAttendanceListResponse> => {
  const recordsByUser = await Promise.all(
    users.map(async (user) => ({
      user,
      records: (await fetchAttendanceRecords(user.id)).attendanceRecords,
    })),
  )

  const attendanceList = recordsByUser.map(({ user, records }) => {
    const todayRecord = getTodayRecord(records)
    const latestRecord = getLatestRecord(records)
    const latestBreak = getLatestBreak(todayRecord)

    return {
      userId: String(user.id),
      status: toAttendanceStatus(user.currentAttendanceState, latestRecord?.workEndDt ?? null),
      clockInTime: formatTime(todayRecord?.workStartDt ?? null),
      breakStartTime: formatTime(latestBreak?.breakStartDt ?? null),
      breakEndTime: formatTime(latestBreak?.breakEndDt ?? null),
      clockOutTime: formatTime(todayRecord?.workEndDt ?? null),
    }
  })

  return { attendanceList }
}

export const fetchAttendanceList = async (): Promise<FetchAttendanceListResponse> => {
  const users = await fetchUsers()

  return fetchAttendanceListByUsers(users)
}

const buildAttendanceUsers = async (users: EmployeeApiUser[]): Promise<AttendanceUser[]> => {
  const attendanceListResponse = await fetchAttendanceListByUsers(users)
  const employees = users.map((user) => ({
    userId: String(user.id),
    userName: user.userName,
  }))
  const attendanceMap = new Map(
    attendanceListResponse.attendanceList.map((item) => [item.userId, item]),
  )

  return employees.map((employee) => {
    const attendanceItem = attendanceMap.get(employee.userId)

    return {
      userId: employee.userId,
      userName: employee.userName,
      status: attendanceItem?.status ?? '出勤前',
      clockInTime: attendanceItem?.clockInTime ?? null,
      breakStartTime: attendanceItem?.breakStartTime ?? null,
      breakEndTime: attendanceItem?.breakEndTime ?? null,
      clockOutTime: attendanceItem?.clockOutTime ?? null,
    }
  })
}

export const fetchAttendanceUsers = async (): Promise<AttendanceUser[]> => {
  const users = await fetchUsers()

  return buildAttendanceUsers(users)
}

export const fetchDashboardData = async (userId: number): Promise<DashboardData> => {
  const users = await fetchUsers()
  const effectiveUser = users.find((user) => user.id === userId)

  if (!effectiveUser) {
    throw new Error('表示できる従業員データがありません。')
  }

  const [attendanceUsers, currentUserRecords] = await Promise.all([
    buildAttendanceUsers(users),
    fetchAttendanceRecords(effectiveUser.id),
  ])

  const currentRecords = currentUserRecords.attendanceRecords
  const todayRecord = getTodayRecord(currentRecords)
  const latestRecord = getLatestRecord(currentRecords)
  const currentAttendanceState = effectiveUser.currentAttendanceState
  const breakMinutes = calculateBreakMinutes(todayRecord?.breaks ?? [], currentAttendanceState)
  const workedMinutes = calculateWorkedMinutes(todayRecord, currentAttendanceState)

  return {
    summary: {
      status: toAttendanceStatus(currentAttendanceState, latestRecord?.workEndDt ?? null),
      workedHours: formatMinutes(workedMinutes),
      breakDuration: formatMinutes(breakMinutes),
    },
    attendanceUsers,
    hasBreakEnded: (todayRecord?.breaks ?? []).some((row) => row.breakEndDt !== null),
  }
}

export const executePunchAction = async (userId: number, action: PunchAction): Promise<void> => {
  const endpointMap: Record<PunchAction, string> = {
    clockIn: '/attendance/start',
    breakStart: '/attendance/break/start',
    breakEnd: '/attendance/break/end',
    clockOut: '/attendance/end',
  }

  await apiRequest<void>(endpointMap[action], {
    method: 'POST',
    body: {
      userId,
    },
  })
}
