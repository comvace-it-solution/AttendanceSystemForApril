import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  AttendanceStatus,
  AttendanceSummary,
  AttendanceUser,
  PunchButton,
  SummaryItem,
} from '../types/attendance'

const PUNCH_BUTTON_DEFS: Omit<PunchButton, 'disabled'>[] = [
  { action: 'clockIn', label: '出勤開始', className: 'punch-button--pink' },
  { action: 'breakStart', label: '休憩開始', className: 'punch-button--navy' },
  { action: 'breakEnd', label: '休憩終了', className: 'punch-button--pink' },
  { action: 'clockOut', label: '退勤', className: 'punch-button--navy' },
]

const DEFAULT_SUMMARY: AttendanceSummary = {
  status: '出勤前',
  workedHours: '00:00',
  breakDuration: '00:00',
}

export const useDashboardStore = defineStore('dashboard', () => {
  const dashboardTitle = ref('勤怠ダッシュボード')
  const summaryTitle = ref('勤務サマリー')
  const punchTitle = ref('本日の打刻')
  const attendanceListTitle = ref('出勤状況一覧')
  const workDate = ref('')

  const summary = ref<AttendanceSummary>({ ...DEFAULT_SUMMARY })
  const hasBreakEnded = ref(false)
  const attendanceUsers = ref<AttendanceUser[]>([])
  const isAttendanceLoading = ref(false)
  const isPunchLoading = ref(false)

  const statusClassMap: Record<AttendanceStatus, string> = {
    出勤前: 'status-before',
    勤務中: 'status-working',
    休憩中: 'status-break',
    退勤済み: 'status-done',
  }

  const summaryItems = computed<SummaryItem[]>(() => [
    {
      label: '現在の状態',
      value: summary.value.status,
      note: '',
    },
    {
      label: '実働時間',
      value: summary.value.workedHours,
      note: '休憩時間を除いた本日の累計',
      className: 'summary-item--worked',
    },
    {
      label: '休憩時間',
      value: summary.value.breakDuration,
      note: '',
    },
  ])

  const punchButtons = computed<PunchButton[]>(() =>
    PUNCH_BUTTON_DEFS.map((button) => {
      const isDisabledByStatus =
        (button.action === 'clockIn' && summary.value.status !== '出勤前') ||
        (button.action === 'breakStart' &&
          !(summary.value.status === '勤務中' && !hasBreakEnded.value)) ||
        (button.action === 'breakEnd' && summary.value.status !== '休憩中') ||
        (button.action === 'clockOut' &&
          !(summary.value.status === '勤務中' && hasBreakEnded.value))

      return {
        ...button,
        disabled: isPunchLoading.value || isDisabledByStatus,
      }
    }),
  )

  const setWorkDate = (value: string) => {
    workDate.value = value
  }

  const setAttendanceUsers = (users: AttendanceUser[]) => {
    attendanceUsers.value = users
  }

  const setAttendanceLoading = (value: boolean) => {
    isAttendanceLoading.value = value
  }

  const setPunchLoading = (value: boolean) => {
    isPunchLoading.value = value
  }

  const setSummary = (value: AttendanceSummary) => {
    summary.value = value
  }

  const setHasBreakEnded = (value: boolean) => {
    hasBreakEnded.value = value
  }

  return {
    attendanceListTitle,
    attendanceUsers,
    dashboardTitle,
    hasBreakEnded,
    isAttendanceLoading,
    isPunchLoading,
    punchButtons,
    punchTitle,
    setAttendanceLoading,
    setAttendanceUsers,
    setHasBreakEnded,
    setPunchLoading,
    setSummary,
    setWorkDate,
    statusClassMap,
    summary,
    summaryItems,
    summaryTitle,
    workDate,
  }
})
