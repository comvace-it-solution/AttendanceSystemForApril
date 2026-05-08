<template>
  <div class="employee-list-page">
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

            <div>{{ employee.attendanceStatus }}</div>

            <div>
              <el-button class="detail-button" @click="handleAttendanceDetailClick(employee.userId)">
                勤怠詳細
              </el-button>
            </div>

            <div>
              <el-button v-if="employee.attendanceStatus === '退勤'" class="delete-button" @click="handleDeleteClick(employee.userId)">
                削除
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination">
        <button class="pagination-button" :disabled="currentPage === 1" @click="handlePrevPage">
          &lt; 前へ
        </button>

        <button v-for="page in totalPages" :key="page" class="pagination-button" :class="{ active: currentPage === page }" @click="handlePageClick(page)">
          {{ page }}
        </button>

        <button class="pagination-button" :disabled="currentPage === totalPages || totalPages === 0" @click="handleNextPage">
          次へ &gt;
        </button>
      </div>
    </div>

    <Modal v-model="errorModalVisible" :title="modalTitle" @ok="closeErrorModal" />

    <Snackbar v-model="snackbarVisible" :message="snackbarMessage" :type="snackbarType" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Modal from '../components/modal/Modal.vue'
import Snackbar from '../components/modal/Snackbar.vue'
import { useEmployeeList } from '../composables/useEmployeeList'
import { useEmployeeDelete } from '../composables/useEmployeeDelete'
import { useFeedbackMessage } from '../composables/useFeedbackMessage'

const {
  employees,
  isFetchError,
  fetchEmployees
} = useEmployeeList()

const { deleteEmployee } = useEmployeeDelete()

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

// 1ページに表示する件数
const itemsPerPage = 10

// 現在のページ番号
const currentPage = ref(1)

// 総ページ数
const totalPages = computed(() => {
  return Math.ceil(employees.value.length / itemsPerPage)
})

// 現在ページに表示する従業員情報
const displayedEmployees = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return employees.value.slice(startIndex, endIndex)
})

// 並び替えボタン押下時の処理
// 今後、別途アクションを追加予定
const handleSortClick = () => {
  console.log('並び替えボタン押下')
}

// 氏名押下時の処理
// 今後、従業員詳細画面への遷移などを追加予定
const handleNameClick = (userId: string) => {
  console.log('氏名押下:', userId)
}

// 勤怠詳細ボタン押下時の処理
// 今後、勤怠詳細画面への遷移を追加予定
const handleAttendanceDetailClick = (userId: string) => {
  console.log('勤怠詳細押下:', userId)
}

// 削除ボタン押下時の処理
// 現在の勤怠状態が「退勤」の従業員のみ削除ボタンが表示される
const handleDeleteClick = async (userId: string) => {
  const result = await deleteEmployee(userId)

  if (result === 'success') {
    openDeleteSuccessSnackbar()
    await fetchEmployees()
  } else if (result === 'notFound') {
    openDeleteErrorModal()
  } else if (result === 'communicationError') {
    openCommunicationErrorSnackbar()
  } else {
    openProcessErrorSnackbar()
  }
}

// 前へ押下時の処理
const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// 次へ押下時の処理
const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// ページ番号押下時の処理
const handlePageClick = (page: number) => {
  currentPage.value = page
}
</script>

<style scoped lang="scss">
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
  background-color: #DE2583;
  color: #FFFFFF;
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
</style>
