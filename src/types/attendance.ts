export type AttendanceStatus = '出勤前' | '勤務中' | '休憩中' | '退勤済み'

export type AttendanceSummary = {
  status: AttendanceStatus
  workedHours: string
  breakDuration: string
}

export type AttendanceUser = {
  userId: string
  userName: string
  status: AttendanceStatus
  clockInTime: string | null
  breakStartTime: string | null
  breakEndTime: string | null
  clockOutTime: string | null
}

export type PunchAction = 'clockIn' | 'breakStart' | 'breakEnd' | 'clockOut'

export type PunchButton = {
  action: PunchAction
  label: string
  className: string
  disabled: boolean
}

export type SummaryItem = {
  label: string
  value: string
  note: string
  className?: string
}

export type EmployeeRow = {
  id: number
  user_name: string
  current_attendance_state: 1 | 2 | null
  current_attendance_id: number | null
}

export type AttendanceRow = {
  id: number
  user_id: number
  work_date: string | null
  work_start_dt: string | null
  work_end_dt: string | null
}

export type AttendanceBreakRow = {
  id: number
  attendance_id: number
  break_start_dt: string | null
  break_end_dt: string | null
}

export type AttendanceListItem = {
  userId: string
  status: AttendanceStatus
  clockInTime: string | null
  breakStartTime: string | null
  breakEndTime: string | null
  clockOutTime: string | null
}

export type FetchEmployeesResponse = Array<{
  userId: string
  userName: string
}>

export type FetchAttendanceListResponse = {
  attendanceList: AttendanceListItem[]
}

export type DashboardData = {
  summary: AttendanceSummary
  attendanceUsers: AttendanceUser[]
  hasBreakEnded: boolean
}
