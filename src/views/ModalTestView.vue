<template>
  <div>
    <h2>ダイアログ 動作確認</h2>

    <div style="margin-bottom: 16px;">
      <el-input v-model="deleteUserId" placeholder="削除するユーザーID" style="width: 240px; margin-right: 8px;" />

      <el-button type="danger" @click="handleDelete">
        削除確認
      </el-button>
    </div>

    <div style="margin-bottom: 16px;">
      <el-button type="primary" @click="handleRegister">
        登録確認
      </el-button>

      <el-button type="primary" @click="handleEdit">
        編集確認
      </el-button>
    </div>

    <Dialog v-model="dialogVisible" :title="dialogTitle" :confirm-text="confirmButtonText" :confirm-button-color="confirmButtonColor" @confirm="handleConfirmDialog" @cancel="handleCancelDialog" />

    <Modal v-model="errorModalVisible" :title="modalTitle" @ok="closeErrorModal" />

    <Snackbar v-model="snackbarVisible" :message="snackbarMessage" :type="snackbarType" />

    <Dialog v-model="dialogVisible" :title="dialogTitle" :confirm-text="confirmButtonText" :confirm-button-color="confirmButtonColor" @confirm="handleConfirmDialog" @cancel="handleCancelDialog" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dialog from '../components/modal/Dialog.vue'
import Modal from '../components/modal/Modal.vue'
import Snackbar from '../components/modal/Snackbar.vue'
import { useEmployeeDelete } from '../composables/useEmployeeDelete'
import { useFeedbackMessage } from '../composables/useFeedbackMessage'
import { useDialogMessage } from '../composables/useDialogMessage'

// 画面で入力した削除対象ID
const deleteUserId = ref('')

// 実行する処理の種類
const currentAction = ref<'delete' | 'register' | 'edit'>('delete')

// 削除API処理
const { deleteEmployee } = useEmployeeDelete()

// ダイアログ表示処理
const {
  dialogVisible,
  dialogTitle,
  confirmButtonText,
  confirmButtonColor,
  openDeleteDialog,
  openRegisterDialog,
  openEditDialog
} = useDialogMessage()

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
  openRegisterSuccessSnackbar,
  openEditCompleteSnackbar,
  openCommunicationErrorSnackbar,
  openProcessErrorSnackbar
} = useFeedbackMessage()

const handleDelete = () => {
  currentAction.value = 'delete'
  openDeleteDialog()
}

const handleRegister = () => {
  currentAction.value = 'register'
  openRegisterDialog()
}

const handleEdit = () => {
  currentAction.value = 'edit'
  openEditDialog()
}

const handleConfirmDialog = async () => {
  if (currentAction.value === 'delete') {
    await handleConfirmDelete()
    return
  }

  if (currentAction.value === 'register') {
    openRegisterSuccessSnackbar()
    return
  }

  openEditCompleteSnackbar()
}

const handleConfirmDelete = async () => {
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

const handleCancelDialog = () => {
  console.log('キャンセル')
}
</script>
