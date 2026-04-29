<template>
  <div>
    <h2>モーダル動作確認</h2>

    <div style="margin-bottom: 16px;">
      <el-input
        v-model="deleteUserId"
        placeholder="削除するユーザーID"
        style="width: 240px; margin-right: 8px;"
      />

      <el-button type="danger" @click="handleDeleteClick">
        削除API実行
      </el-button>
    </div>

    <Modal
      v-model="errorModalVisible"
      :title="modalTitle"
      @ok="closeErrorModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from '../components/modal/Modal.vue'
import { useEmployeeDelete } from '../composables/useEmployeeDelete'
import { useFeedbackMessage } from '../composables/useFeedbackMessage'

const deleteUserId = ref('')

const { deleteEmployee } = useEmployeeDelete()

const {
  errorModalVisible,
  modalTitle,
  openDeleteErrorModal,
  openDeleteSuccessSnackbar,
  closeErrorModal
} = useFeedbackMessage()

const handleDeleteClick = async () => {
  const result = await deleteEmployee(deleteUserId.value)

  if (result) {
    openDeleteSuccessSnackbar()
    return
  }

  openDeleteErrorModal()
}
</script>