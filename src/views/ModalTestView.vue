<template>
  <div>
    <h2>削除処理 動作確認</h2>

    <div style="margin-bottom: 16px;">
      <el-input v-model="deleteUserId" placeholder="削除するユーザーID" style="width: 240px; margin-right: 8px;" />

      <el-button type="danger" @click="openDeleteDialog">
        削除API実行
      </el-button>
    </div>

    <Dialog v-model="deleteDialogVisible" @delete="handleDelete" @cancel="handleCancelDelete" />

    <Modal v-model="errorModalVisible" :title="modalTitle" @ok="closeErrorModal" />

    <Snackbar v-model="snackbarVisible" :message="snackbarMessage" :type="snackbarType" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dialog from '../components/modal/Dialog.vue'
import Modal from '../components/modal/Modal.vue'
import Snackbar from '../components/modal/Snackbar.vue'
import { useEmployeeDelete } from '../composables/useEmployeeDelete'
import { useFeedbackMessage } from '../composables/useFeedbackMessage'

// 画面で入力した削除対象ID
const deleteUserId = ref('')

// 削除確認ダイアログの表示/非表示
const deleteDialogVisible = ref(false)

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

// 削除API実行ボタン押下時の処理
// ここではAPIを実行せず、確認ダイアログを表示するだけ
const openDeleteDialog = () => {
  deleteDialogVisible.value = true
}

// 削除確認ダイアログの「削除」押下時の処理
// ここで初めて削除APIを実行する
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

// 削除確認ダイアログの「キャンセル」押下時の処理
const handleCancelDelete = () => {
  console.log('削除をキャンセルしました')
}
</script>
