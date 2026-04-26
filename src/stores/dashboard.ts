import { defineStore } from 'pinia'
import type { AttendanceStatus, AttendanceUser } from '../types/attendance'

export type SummaryItem = {
  label: string
  value: string
  note: string
  className?: string
}

export type PunchButton = {
  label: string
  className: string
}

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    dashboardTitle: '勤怠ダッシュボード',
    summaryTitle: '勤務サマリー',
    punchTitle: '本日の打刻',
    attendanceListTitle: '出勤状況一覧',
    workDate: '',
    summaryItems: [
      {
        label: '現在の状態',
        value: '退勤済み',
        note: '',
      },
      {
        label: '実働時間',
        value: '08:00',
        note: '休憩時間を除いた本日の累計',
        className: 'summary-item--worked',
      },
      {
        label: '休憩時間',
        value: '01:00',
        note: '',
      },
    ] as SummaryItem[],
    punchButtons: [
      { label: '出勤開始', className: 'punch-button--pink' },
      { label: '休憩開始', className: 'punch-button--navy' },
      { label: '休憩終了', className: 'punch-button--pink' },
      { label: '退勤', className: 'punch-button--navy' },
    ] as PunchButton[],
    attendanceUsers: [] as AttendanceUser[],
    isAttendanceLoading: false,
    statusClassMap: {
      出勤前: 'status-before',
      勤務中: 'status-working',
      休憩中: 'status-break',
      退勤済み: 'status-done',
    } as Record<AttendanceStatus, string>,
  }),
  actions: {
    setWorkDate(value: string) {
      this.workDate = value
    },
    setAttendanceUsers(users: AttendanceUser[]) {
      this.attendanceUsers = users
    },
    setAttendanceLoading(value: boolean) {
      this.isAttendanceLoading = value
    },
  },
})
