<template>
  <div>
    <h2>削除処理 動作確認</h2>

    <div style="margin-bottom: 16px;">
      <el-input v-model="deleteUserId" placeholder="削除するユーザーID" style="width: 240px; margin-right: 8px;" />

      <el-button type="danger" @click="handleDelete">
        削除API実行
      </el-button>
    </div>

    <Modal v-model="errorModalVisible" :title="modalTitle" @ok="closeErrorModal" />

    <Snackbar v-model="snackbarVisible" :message="snackbarMessage" :type="snackbarType" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from '../components/modal/Modal.vue'
import Snackbar from '../components/modal/Snackbar.vue'
import { useEmployeeDelete } from '../composables/useEmployeeDelete'
import { useFeedbackMessage } from '../composables/useFeedbackMessage'

// 画面で入力した削除対象ID
const deleteUserId = ref('')

// 削除API処理
const { deleteEmployee } = useEmployeeDelete()

// モーダル・スナックバー表示処理
const {
  errorModalVisible,
  modalTitle,
  snackbarVisible,
  snackbarMessage,
  snackbarType,
  closeErrorModal,
  openDeleteErrorModal,
  openDeleteSuccessSnackbar,
  openCommunicationErrorSnackbar,
  openProcessErrorSnackbar
} = useFeedbackMessage()

const handleDelete = async () => {
  const result = await deleteEmployee(deleteUserId.value)

  console.log('削除結果:', result)

  if (result === 'success') {
    openDeleteSuccessSnackbar()
  } else if (result === 'notFound') {
    openDeleteErrorModal()
  } else if (result === 'communicationError') {
    openCommunicationErrorSnackbar()
  } else {
    openProcessErrorSnackbar()
  }
}
</script>
