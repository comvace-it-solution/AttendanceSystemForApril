<template>
  <div class="employee-list-page">
    <div class="employee-list-search-area">
      <el-input v-model="searchKeyword" placeholder="例：従業員ID、氏名、生年月日、配属日" class="employee-list-search-input" />

      <el-button class="employee-list-search-button" @click="handleSearch">
        検索
      </el-button>

      <el-button class="employee-register-button" @click="handleRegisterClick">
        従業員登録
      </el-button>
    </div>

    <div v-if="isFetchError" class="retry-area">
      <button class="retry-button" @click="fetchEmployees">
        再試行
      </button>
    </div>

    <div v-else class="employee-list">
      <div class="employee-list__content">
        <div class="employee-list__header">
          <div>従業員ID</div>
          <div>氏名</div>
          <div>生年月日</div>
          <div>配属日</div>
          <div>現在の勤怠状態</div>
          <div>
            <el-button class="sort-button" @click="handleSortClick">
              並び替え
            </el-button>
          </div>
          <div></div>
        </div>

        <div class="employee-list__body">
          <div v-for="employee in displayedEmployees" :key="employee.userId" class="employee-list__row">
            <div>{{ employee.userId }}</div>

            <div class="employee-name" @click="handleNameClick(employee.userId)">
              {{ employee.userName }}
            </div>

            <div>{{ employee.birthDate }}</div>

            <div>{{ employee.assignedDate }}</div>

            <div>{{ employee.attendanceStatus || '退勤' }}</div>

            <div>
              <el-button class="detail-button" @click="handleAttendanceDetailClick(employee.userId, employee.userName)">
                勤怠詳細
              </el-button>
            </div>

            <div>
              <el-button v-if="employee.attendanceStatus === '退勤' || !employee.attendanceStatus" class="delete-button" @click="handleDeleteClick(employee.userId)">
                削除
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="employee-list-card-area">
        <el-button class="mobile-sort-button" @click="handleSortClick">
          並び替え
        </el-button>

        <div v-for="employee in displayedEmployees" :key="employee.userId" class="employee-card">
          <div class="employee-card__info">
            <div>従業員ID：{{ employee.userId }}</div>

            <div>
              氏名：
              <span class="employee-name" @click="handleNameClick(employee.userId)">
                {{ employee.userName }}
              </span>
            </div>

            <div>生年月日：{{ employee.birthDate }}</div>
            <div>配属日：{{ employee.assignedDate }}</div>
            <div>現在の勤務状態：{{ employee.attendanceStatus || '退勤' }}</div>
          </div>

          <div class="employee-card__actions">
            <el-button class="detail-button" @click="handleAttendanceDetailClick(employee.userId, employee.userName)">
              勤怠詳細
            </el-button>
            <el-button v-if="employee.attendanceStatus === '退勤' || !employee.attendanceStatus" class="delete-button" @click="handleDeleteClick(employee.userId)">
              削除
            </el-button>
          </div>
        </div>
      </div>

      <div class="pagination">
        <button class="pagination-button" :disabled="currentPage === 1" @click="handlePrevPage">
          &lt; 前へ
        </button>

        <button v-for="page in displayPageNumbers" :key="page" class="pagination-button" :class="{ active: currentPage === page }" @click="handlePageClick(page)">
          {{ page }}
        </button>

        <button class="pagination-button" :disabled="currentPage === totalPages || totalPages === 0" @click="handleNextPage">
          次へ &gt;
        </button>
      </div>
    </div>

    <Modal v-model="errorModalVisible" :title="modalTitle" @ok="closeErrorModal" />
    <Snackbar v-model="snackbarVisible" :message="snackbarMessage" :type="snackbarType" />
    <Dialog v-model="dialogVisible" :title="dialogTitle" :confirm-text="confirmButtonText" :confirm-button-color="confirmButtonColor" @confirm="handleConfirmDelete" @cancel="handleCancelDelete" />
    <SortBottomSheet v-model="sortBottomSheetVisible" :sort-key="sortKey" :sort-order="sortOrder" @apply="handleApplySort" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import Modal from '../components/modal/Modal.vue'
import Snackbar from '../components/modal/Snackbar.vue'
import Dialog from '../components/modal/Dialog.vue'
import SortBottomSheet from '../components/modal/SortBottomSheet.vue'
import { useEmployeeList } from '../composables/useEmployeeList'
import { useEmployeeDelete } from '../composables/useEmployeeDelete'
import { useFeedbackMessage } from '../composables/useFeedbackMessage'
import { useRouter } from 'vue-router'
import { useDialogMessage } from '../composables/useDialogMessage'

const router = useRouter()

type SortKey = 'userId' | 'userName' | 'birthDate' | 'assignedDate' | 'currentAttendanceState'
type SortOrder = 'asc' | 'desc'

const sortBottomSheetVisible = ref(false)
const sortKey = ref<SortKey>('userId')
const sortOrder = ref<SortOrder>('asc')

const searchKeyword = ref('')
const appliedSearchKeyword = ref('')
const selectedDeleteUserId = ref('')

const isMobile = ref(false)

const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 480
}

const {
  dialogVisible,
  dialogTitle,
  confirmButtonText,
  confirmButtonColor,
  openDeleteDialog
} = useDialogMessage()

onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
})

const itemsPerPage = computed(() => {
  return isMobile.value ? 3 : 10
})

watch(isMobile, () => {
  currentPage.value = 1
})

const currentPage = ref(1)

const { deleteEmployee } = useEmployeeDelete()

const {
  employees,
  isFetchError,
  fetchEmployees
} = useEmployeeList()

const {
  errorModalVisible,
  modalTitle,
  snackbarVisible,
  snackbarMessage,
  snackbarType,
  closeErrorModal,
  openDeleteSuccessSnackbar,
  openDeleteErrorModal,
  openCommunicationErrorSnackbar,
  openProcessErrorSnackbar
} = useFeedbackMessage()

const handleSearch = () => {
  appliedSearchKeyword.value = searchKeyword.value.trim()
  currentPage.value = 1
}

const handleRegisterClick = () => {
  router.push({
    name: 'EmployeeRegister'
  })
}

const filteredEmployees = computed(() => {
  if (!appliedSearchKeyword.value) {
    return employees.value
  }

  const keyword = appliedSearchKeyword.value.toLowerCase()

  return employees.value.filter((employee) => {
    return (
      employee.userId.toLowerCase().includes(keyword) ||
      employee.userName.toLowerCase().includes(keyword) ||
      (employee.email ?? '').toLowerCase().includes(keyword) ||
      (employee.birthDate ?? '').toLowerCase().includes(keyword) ||
      (employee.assignedDate ?? '').toLowerCase().includes(keyword)
    )
  })
})

const sortedEmployees = computed(() => {
  return [...filteredEmployees.value].sort((a, b) => {
    const getSortValue = (employee: any) => {
      if (sortKey.value === 'currentAttendanceState') {
        return employee.currentAttendanceState === 2 ? 1 : 0
      }

      return employee[sortKey.value] ?? ''
    }

    const aValue = getSortValue(a)
    const bValue = getSortValue(b)

    if (aValue < bValue) {
      return sortOrder.value === 'asc' ? -1 : 1
    }

    if (aValue > bValue) {
      return sortOrder.value === 'asc' ? 1 : -1
    }

    return 0
  })
})

const totalPages = computed(() => {
  return Math.ceil(sortedEmployees.value.length / itemsPerPage.value)
})
const displayPageNumbers = computed(() => {
  const maxDisplayPages = 5

  if (totalPages.value <= maxDisplayPages) {
    return Array.from({ length: totalPages.value }, (_, index) => index + 1)
  }

  let startPage = currentPage.value - 2
  let endPage = currentPage.value + 2

  if (startPage < 1) {
    startPage = 1
    endPage = maxDisplayPages
  }

  if (endPage > totalPages.value) {
    endPage = totalPages.value
    startPage = totalPages.value - maxDisplayPages + 1
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index)
})

const displayedEmployees = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value

  return sortedEmployees.value.slice(startIndex, endIndex)
})

const handleSortClick = () => {
  sortBottomSheetVisible.value = true
}

const handleApplySort = (selectedSortKey: SortKey, selectedSortOrder: SortOrder) => {
  sortKey.value = selectedSortKey
  sortOrder.value = selectedSortOrder
  currentPage.value = 1
}

const handleNameClick = (userId: string) => {
  router.push({
    name: 'EmployeeDetail',
    params: { id: userId }
  })
}

const handleAttendanceDetailClick = (userId: string, userName: string) => {
  console.log('勤怠詳細押下:', userId, userName)

  router.push({
    name: 'AttendanceDetails',
    params: { id: userId },
    query: { name: userName }
  })
}

const handleDeleteClick = (userId: string) => {
  console.log('削除ボタン押下:', userId)
  selectedDeleteUserId.value = userId
  openDeleteDialog()
}

const handleConfirmDelete = async () => {
  const result = await deleteEmployee(Number(selectedDeleteUserId.value).toString())

  if (result === 'success') {
    openDeleteSuccessSnackbar()
    selectedDeleteUserId.value = ''
    await fetchEmployees()
  } else if (result === 'notFound') {
    openDeleteErrorModal()
  } else if (result === 'communicationError') {
    openCommunicationErrorSnackbar()
  } else {
    openProcessErrorSnackbar()
  }
}

const handleCancelDelete = () => {
  selectedDeleteUserId.value = ''
}

const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const handlePageClick = (page: number) => {
  currentPage.value = page
}
</script>

<style scoped lang="scss">
button {
  width: auto;
}

.employee-list-page {
  min-height: 100vh;
  background-color: #ffdede;
  padding: 20px;
  padding-bottom: 53px;
  box-sizing: border-box;
}

.employee-list {
  width: 100%;
}

.employee-list__content {
  width: 100%;
}

.employee-list__header {
  display: grid;
  grid-template-columns: 1.1fr 1.1fr 1.1fr 1.1fr 1.1fr 0.9fr 0.9fr;
  align-items: center;
  height: 23px;
  background-color: #f5f5f5;
  text-align: center;
  font-size: 16px;
  margin-bottom: 34px;
}

.employee-list__body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 34px;
}

.employee-list__row {
  display: grid;
  grid-template-columns: 1.1fr 1.1fr 1.1fr 1.1fr 1.1fr 0.9fr 0.9fr;
  align-items: center;
  min-height: 43px;
  background-color: #f1f1f1;
  border-radius: 9px;
  text-align: center;
  font-size: 16px;
  margin: 0 10px;
}

.employee-name {
  color: #0000ff;
  cursor: pointer;
}

.sort-button {
  width: 100px;
  height: 18px;
  border-radius: 4px;
  background-color: #5c5c5c;
  color: #ffffff;
  border: none;
  padding: 0;
}

.detail-button {
  width: 100px;
  height: 20px;
  border-radius: 4px;
  background-color: #5c5c5c;
  color: #ffffff;
  border: none;
  padding: 0;
}

.delete-button {
  width: 97px;
  height: 19px;
  border-radius: 5px;
  background-color: #de2583;
  color: #ffffff;
  border: none;
  padding: 0;
}

.pagination {
  position: fixed;
  left: 20px;
  right: 20px;
  bottom: 20px;
  height: 19px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  font-size: 16px;
}

.pagination-button {
  border: none;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
}

.pagination-button:disabled {
  cursor: default;
  opacity: 0.4;
}

.pagination-button.active {
  font-weight: bold;
}

.retry-area {
  min-height: calc(100vh - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.retry-button {
  width: 212px;
  height: 97px;
  border-radius: 20px;
  background-color: #0d2b81;
  color: #ffffff;
  font-size: 64px;
  border: none;
  cursor: pointer;
}

.employee-list-search-area {
  width: 100%;
  height: 56px;
  background-color: #eaf1ff;
  display: flex;
  align-items: center;
  padding-left: 40px;
  box-sizing: border-box;
  gap: 95px;
}

.employee-list-search-input {
  width: 750px;
  height: 40px;
}

.employee-list-search-button {
  width: 77px;
  height: 38px;
  background-color: #9aadd5;
  color: #000000;
  border: none;
  border-radius: 8px;
}

.employee-register-button {
  width: 134px;
  height: 38px;
  background-color: #9aadd5;
  color: #000000;
  border: none;
  border-radius: 8px;
}

.employee-list-card-area {
  display: none;
}

@media screen and (max-width: 480px) {
  .employee-list-page {
    width: 100%;
    min-height: 100vh;
    padding: 0;
    padding-bottom: 40px;
    background-color: #ffdede;
    box-sizing: border-box;
  }

  .employee-list-search-area {
    width: 100%;
    height: 114px;
    background-color: #eaf1ff;
    display: grid;
    grid-template-columns: 1fr 80px;
    grid-template-rows: 24px 40px 40px;
    column-gap: 8px;
    row-gap: 4px;
    padding: 0 10px 8px;
    box-sizing: border-box;
  }

  .employee-list-search-area::before {
    content: '検索';
    grid-column: 1 / 3;
    grid-row: 1;
    font-size: 16px;
    font-weight: bold;
    color: #000000;
  }

  .employee-list-search-input {
    grid-column: 1;
    grid-row: 2;
    width: 100%;
    height: 38px;
  }

  .employee-list-search-button {
    grid-column: 2;
    grid-row: 2;
    width: 76px;
    height: 38px;
    background-color: #9aadd5;
    color: #000000;
    border: none;
    border-radius: 6px;
    font-size: 16px;
  }

  .employee-register-button {
    grid-column: 1;
    grid-row: 3;
    width: 112px;
    height: 34px;
    background-color: #9aadd5;
    color: #000000;
    border: none;
    border-radius: 6px;
    font-size: 16px;
  }

  .employee-list__content {
    display: none;
  }

  .employee-list-card-area {
    display: block;
    padding: 14px 20px 0;
    box-sizing: border-box;
  }

  .mobile-sort-button {
    display: block;
    width: 100px;
    height: 20px;
    margin: 0 auto 30px;
    background-color: #5c5c5c;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    line-height: 20px;
    padding: 0;
  }

  .employee-card {
    position: relative;
    width: 100%;
    min-height: 170px;
    background-color: #f1f1f1;
    border-radius: 8px;
    margin-bottom: 30px;
    padding: 18px 12px;
    box-sizing: border-box;
  }

  .employee-card__info {
    font-size: 16px;
    line-height: 1.45;
    color: #000000;
    padding-right: 100px;
  }

  .employee-card__actions {
    position: absolute;
    right: 10px;
    top: 34px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 16px;
  }

  .detail-button {
    width: 82px;
    height: 22px;
    background-color: #5c5c5c;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    padding: 0;
  }

  .delete-button {
    width: 82px;
    height: 22px;
    background-color: #de2583;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    padding: 0;
  }

  .pagination {
    position: fixed;
    left: 20px;
    right: 20px;
    bottom: 8px;
    height: 18px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    font-size: 16px;
    z-index: 10;
  }

  .pagination-button {
    font-size: 16px;
    padding: 0;
  }

  .retry-area {
    min-height: calc(100vh - 114px);
  }

  .retry-button {
    width: 212px;
    height: 97px;
    border-radius: 20px;
    background-color: #0d2b81;
    color: #ffffff;
    font-size: 64px;
    border: none;
    cursor: pointer;
  }
}
</style>
