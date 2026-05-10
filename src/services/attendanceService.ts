import { supabase } from '../supabase/client'
import type {
  AttendanceBreakRow,
  AttendanceListItem,
  AttendanceRow,
  AttendanceStatus,
  AttendanceSummary,
  AttendanceUser,
  DashboardData,
  EmployeeRow,
  FetchAttendanceListResponse,
  FetchEmployeesResponse,
  PunchAction,
} from '../types/attendance'

const getNowIsoString = () => new Date().toISOString()
const getWorkDateString = (isoDateTime = getNowIsoString()) => isoDateTime.slice(0, 10)

const formatTime = (value: string | null) => {
  if (!value) {
    return null
  }

  const date = new Date(value)
  return new Intl.DateTimeFormat('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
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

const getLatestAttendanceMap = (attendanceRows: AttendanceRow[]) => {
  const latestAttendanceMap = new Map<number, AttendanceRow>()

  for (const row of attendanceRows) {
    if (!latestAttendanceMap.has(row.user_id)) {
      latestAttendanceMap.set(row.user_id, row)
    }
  }

  return latestAttendanceMap
}

const getTodayAttendanceForUser = (attendanceRows: AttendanceRow[], userId: number) => {
  const todayDate = getWorkDateString()
  return attendanceRows.find((attendance) => attendance.user_id === userId && attendance.work_date === todayDate) ?? null
}

const getBreakRowsForAttendance = (
  attendanceBreakRows: AttendanceBreakRow[],
  attendanceId: number | null,
) => {
  if (attendanceId === null) {
    return []
  }

  return attendanceBreakRows
    .filter((row) => row.attendance_id === attendanceId)
    .sort((a, b) => b.id - a.id)
}

const calculateBreakMinutes = (
  breakRows: AttendanceBreakRow[],
  currentAttendanceState: 1 | 2 | null,
) => {
  const now = getNowIsoString()

  return breakRows.reduce((total, row) => {
    if (!row.break_start_dt) {
      return total
    }

    if (row.break_end_dt) {
      return total + getDiffMinutes(row.break_start_dt, row.break_end_dt)
    }

    if (currentAttendanceState === 2) {
      return total + getDiffMinutes(row.break_start_dt, now)
    }

    return total
  }, 0)
}

const calculateWorkedMinutes = (
  attendanceRow: AttendanceRow | null,
  breakRows: AttendanceBreakRow[],
  currentAttendanceState: 1 | 2 | null,
) => {
  if (!attendanceRow?.work_start_dt) {
    return 0
  }

  const endReference =
    attendanceRow.work_end_dt ??
    (currentAttendanceState === 1 || currentAttendanceState === 2 ? getNowIsoString() : null)

  if (!endReference) {
    return 0
  }

  const totalMinutes = getDiffMinutes(attendanceRow.work_start_dt, endReference)
  const breakMinutes = calculateBreakMinutes(breakRows, currentAttendanceState)

  return Math.max(0, totalMinutes - breakMinutes)
}

export const fetchEmployees = async (): Promise<FetchEmployeesResponse> => {
  const { data, error } = await supabase
    .from('users')
    .select('id, user_name, current_attendance_state, current_attendance_id')
    .order('id', { ascending: true })

  if (error) {
    throw new Error(error.message || '従業員一覧の取得に失敗しました。')
  }

  return ((data ?? []) as EmployeeRow[]).map((row) => ({
    userId: String(row.id),
    userName: row.user_name,
  }))
}

const fetchEmployeeRows = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('id, user_name, current_attendance_state, current_attendance_id')
    .order('id', { ascending: true })

  if (error) {
    throw new Error(error.message || 'ユーザー一覧の取得に失敗しました。')
  }

  return (data ?? []) as EmployeeRow[]
}

const fetchAttendanceRows = async () => {
  const { data, error } = await supabase
    .from('attendance')
    .select('id, user_id, work_date, work_start_dt, work_end_dt')
    .order('id', { ascending: false })

  if (error) {
    throw new Error(error.message || '勤怠データの取得に失敗しました。')
  }

  return (data ?? []) as AttendanceRow[]
}

const fetchAttendanceBreakRows = async () => {
  const { data, error } = await supabase
    .from('attendance_breaks')
    .select('id, attendance_id, break_start_dt, break_end_dt')
    .order('id', { ascending: false })

  if (error) {
    throw new Error(error.message || '休憩データの取得に失敗しました。')
  }

  return (data ?? []) as AttendanceBreakRow[]
}

export const fetchAttendanceList = async (): Promise<FetchAttendanceListResponse> => {
  const [employeeRows, attendanceRows, attendanceBreakRows] = await Promise.all([
    fetchEmployeeRows(),
    fetchAttendanceRows(),
    fetchAttendanceBreakRows(),
  ])

  const latestAttendanceMap = getLatestAttendanceMap(attendanceRows)

  const attendanceList: AttendanceListItem[] = employeeRows.map((row) => {
    const todayAttendance = getTodayAttendanceForUser(attendanceRows, row.id)
    const latestAttendance = latestAttendanceMap.get(row.id) ?? null
    const breakRows = getBreakRowsForAttendance(attendanceBreakRows, todayAttendance?.id ?? null)

    return {
      userId: String(row.id),
      status: toAttendanceStatus(
        row.current_attendance_state,
        latestAttendance?.work_end_dt ?? null,
      ),
      clockInTime: formatTime(todayAttendance?.work_start_dt ?? null),
      breakStartTime: formatTime(breakRows[0]?.break_start_dt ?? null),
      breakEndTime: formatTime(breakRows[0]?.break_end_dt ?? null),
      clockOutTime: formatTime(todayAttendance?.work_end_dt ?? null),
    }
  })

  return { attendanceList }
}

const buildSummary = (
  employeeRow: EmployeeRow | undefined,
  attendanceRows: AttendanceRow[],
  attendanceBreakRows: AttendanceBreakRow[],
): { summary: AttendanceSummary; hasBreakEnded: boolean } => {
  if (!employeeRow) {
    return {
      summary: {
        status: '出勤前',
        workedHours: '00:00',
        breakDuration: '00:00',
      },
      hasBreakEnded: false,
    }
  }

  const latestAttendance = getLatestAttendanceMap(attendanceRows).get(employeeRow.id) ?? null
  const todayAttendance = getTodayAttendanceForUser(attendanceRows, employeeRow.id)
  const breakRows = getBreakRowsForAttendance(attendanceBreakRows, todayAttendance?.id ?? null)
  const status = toAttendanceStatus(
    employeeRow.current_attendance_state,
    latestAttendance?.work_end_dt ?? null,
  )
  const breakMinutes = calculateBreakMinutes(breakRows, employeeRow.current_attendance_state)
  const workedMinutes = calculateWorkedMinutes(
    todayAttendance,
    breakRows,
    employeeRow.current_attendance_state,
  )

  return {
    summary: {
      status,
      workedHours: formatMinutes(workedMinutes),
      breakDuration: formatMinutes(breakMinutes),
    },
    hasBreakEnded: breakRows.some((row) => row.break_end_dt !== null),
  }
}

export const fetchDashboardData = async (userId: number): Promise<DashboardData> => {
  const [employeeRows, attendanceRows, attendanceBreakRows, attendanceListResponse] =
    await Promise.all([
      fetchEmployeeRows(),
      fetchAttendanceRows(),
      fetchAttendanceBreakRows(),
      fetchAttendanceList(),
    ])

  const employees = employeeRows.map((row) => ({
    userId: String(row.id),
    userName: row.user_name,
  }))

  const attendanceMap = new Map(
    attendanceListResponse.attendanceList.map((item) => [item.userId, item]),
  )

  const attendanceUsers: AttendanceUser[] = employees.map((employee) => {
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

  const currentEmployee = employeeRows.find((row) => row.id === userId)
  const { summary, hasBreakEnded } = buildSummary(
    currentEmployee,
    attendanceRows,
    attendanceBreakRows,
  )

  return {
    summary,
    attendanceUsers,
    hasBreakEnded,
  }
}

const getCurrentAttendanceId = async (userId: number) => {
  const { data, error } = await supabase
    .from('users')
    .select('current_attendance_id')
    .eq('id', userId)
    .single()

  if (error || !data) {
    throw new Error(error?.message || '現在の勤怠ID取得に失敗しました。')
  }

  return data.current_attendance_id as number | null
}

export const executePunchAction = async (userId: number, action: PunchAction) => {
  const now = getNowIsoString()
  const todayDate = getWorkDateString(now)

  if (action === 'clockIn') {
    const { data: attendanceData, error: attendanceError } = await supabase
      .from('attendance')
      .insert({
        user_id: userId,
        work_date: todayDate,
        work_start_dt: now,
        updated_dt: now,
      })
      .select('id')
      .single()

    if (attendanceError || !attendanceData) {
      throw new Error(attendanceError?.message || '出勤開始に失敗しました。')
    }

    const { error: userError } = await supabase
      .from('users')
      .update({
        current_attendance_state: 1,
        current_attendance_id: attendanceData.id,
        updated_dt: now,
      })
      .eq('id', userId)

    if (userError) {
      throw new Error(userError.message || '出勤状態の更新に失敗しました。')
    }

    return
  }

  const currentAttendanceId = await getCurrentAttendanceId(userId)

  if (!currentAttendanceId) {
    throw new Error('現在の勤怠IDが取得できません。')
  }

  if (action === 'breakStart') {
    const { error: breakError } = await supabase.from('attendance_breaks').insert({
      attendance_id: currentAttendanceId,
      break_start_dt: now,
      updated_dt: now,
    })

    if (breakError) {
      throw new Error(breakError.message || '休憩開始に失敗しました。')
    }

    const { error: userError } = await supabase
      .from('users')
      .update({
        current_attendance_state: 2,
        updated_dt: now,
      })
      .eq('id', userId)

    if (userError) {
      throw new Error(userError.message || '休憩状態の更新に失敗しました。')
    }

    return
  }

  if (action === 'breakEnd') {
    const { data: breakData, error: breakSelectError } = await supabase
      .from('attendance_breaks')
      .select('id')
      .eq('attendance_id', currentAttendanceId)
      .is('break_end_dt', null)
      .order('id', { ascending: false })
      .limit(1)
      .single()

    if (breakSelectError || !breakData) {
      throw new Error(breakSelectError?.message || '終了対象の休憩が見つかりません。')
    }

    const { error: breakUpdateError } = await supabase
      .from('attendance_breaks')
      .update({
        break_end_dt: now,
        updated_dt: now,
      })
      .eq('id', breakData.id)

    if (breakUpdateError) {
      throw new Error(breakUpdateError.message || '休憩終了に失敗しました。')
    }

    const { error: userError } = await supabase
      .from('users')
      .update({
        current_attendance_state: 1,
        updated_dt: now,
      })
      .eq('id', userId)

    if (userError) {
      throw new Error(userError.message || '勤務状態の更新に失敗しました。')
    }

    return
  }

  if (action === 'clockOut') {
    const { error: attendanceError } = await supabase
      .from('attendance')
      .update({
        work_end_dt: now,
        updated_dt: now,
      })
      .eq('id', currentAttendanceId)

    if (attendanceError) {
      throw new Error(attendanceError.message || '退勤に失敗しました。')
    }

    const { error: userError } = await supabase
      .from('users')
      .update({
        current_attendance_state: null,
        current_attendance_id: null,
        updated_dt: now,
      })
      .eq('id', userId)

    if (userError) {
      throw new Error(userError.message || '退勤状態の更新に失敗しました。')
    }
  }
}
