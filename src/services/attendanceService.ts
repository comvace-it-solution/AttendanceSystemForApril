import type { AttendanceUser } from '../types/attendance'

const mockAttendanceUsers: AttendanceUser[] = [
  {
    userId: 'u001',
    userName: 'マスター ユーザー',
    status: '退勤済み',
    clockInTime: '09:00',
    breakStartTime: '12:00',
    breakEndTime: '13:00',
    clockOutTime: '18:00',
  },
  {
    userId: 'u002',
    userName: 'ボビー オロゴン',
    status: '勤務中',
    clockInTime: '09:30',
    breakStartTime: '12:15',
    breakEndTime: '13:00',
    clockOutTime: null,
  },
  {
    userId: 'u003',
    userName: 'YAZAWA',
    status: '休憩中',
    clockInTime: '10:00',
    breakStartTime: '14:00',
    breakEndTime: null,
    clockOutTime: null,
  },
  {
    userId: 'u004',
    userName: '佐藤 花子',
    status: '出勤前',
    clockInTime: null,
    breakStartTime: null,
    breakEndTime: null,
    clockOutTime: null,
  },
]

export const fetchAttendanceUsers = async (): Promise<AttendanceUser[]> => {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 200)
  })

  return mockAttendanceUsers
}
