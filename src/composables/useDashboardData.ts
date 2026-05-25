import { computed, ref } from 'vue'
import { fetchAttendanceUsers, fetchDashboardData } from '../services/attendanceService'
import { useAuthStore } from '../stores/auth'
import { useDashboardStore } from '../stores/dashboard'

export const useDashboardData = () => {
  const authStore = useAuthStore()
  const dashboardStore = useDashboardStore()
  const apiUserName = ref('')

  const currentUserId = computed(() => {
    const userId = authStore.user?.userId
    const numericUserId = Number(userId)

    return Number.isFinite(numericUserId) ? numericUserId : null
  })

  const displayUserName = computed(() => apiUserName.value || 'ユーザー')

  const setWorkDate = () => {
    dashboardStore.setWorkDate(
      new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short',
      }).format(new Date()),
    )
  }

  const loadDashboard = async () => {
    dashboardStore.setAttendanceLoading(true)

    try {
      const attendanceUsers = await fetchAttendanceUsers()
      dashboardStore.setAttendanceUsers(attendanceUsers)

      if (!currentUserId.value) {
        apiUserName.value = ''
        return
      }

      const currentAttendanceUser = attendanceUsers.find(
        (user) => Number(user.userId) === currentUserId.value,
      )
      apiUserName.value = currentAttendanceUser?.userName ?? ''

      const dashboardData = await fetchDashboardData(currentUserId.value)
      dashboardStore.setSummary(dashboardData.summary)
      dashboardStore.setHasBreakEnded(dashboardData.hasBreakEnded)
    } finally {
      dashboardStore.setAttendanceLoading(false)
    }
  }

  return {
    currentUserId,
    displayUserName,
    loadDashboard,
    setWorkDate,
  }
}
