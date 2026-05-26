import { computed, type ComputedRef } from 'vue'
import { executePunchAction } from '../services/attendanceService'
import { useDashboardStore } from '../stores/dashboard'
import type { PunchAction } from '../types/attendance'

type UsePunchActionOptions = {
  currentUserId: ComputedRef<number | null>
  loadDashboard: () => Promise<void>
  onLoginMissing: () => void
  onSuccess: () => void
  onError: (error: unknown) => void
}

export const usePunchAction = ({
  currentUserId,
  loadDashboard,
  onLoginMissing,
  onSuccess,
  onError,
}: UsePunchActionOptions) => {
  const dashboardStore = useDashboardStore()

  const isPunchDisabled = computed(() => !currentUserId.value || dashboardStore.isPunchLoading)

  const handlePunchClick = async (action: PunchAction) => {
    if (dashboardStore.isPunchLoading) {
      return
    }

    dashboardStore.setPunchLoading(true)

    try {
      if (!currentUserId.value) {
        onLoginMissing()
        return
      }

      await executePunchAction(currentUserId.value, action)
      await loadDashboard()
      onSuccess()
    } catch (error) {
      onError(error)
    } finally {
      dashboardStore.setPunchLoading(false)
    }
  }

  return {
    handlePunchClick,
    isPunchDisabled,
  }
}
