export type AttendanceStatus = '出勤前' | '勤務中' | '休憩中' | '退勤済み'

export type AttendanceUser = {
  userId: string
  userName: string
  status: AttendanceStatus
  clockInTime: string | null
  breakStartTime: string | null
  breakEndTime: string | null
  clockOutTime: string | null
}
