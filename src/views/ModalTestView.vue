<template>
  <div>
    <el-input v-model="deleteUserId" placeholder="削除するユーザーID" style="width: 240px; margin-right: 8px;" />

    <el-button type="danger" @click="deleteDialogVisible = true">
      削除
    </el-button>

    <Dialog v-model="deleteDialogVisible" @delete="handleDelete" @cancel="handleCancel" />

    <Modal v-model="errorModalVisible" :title="modalTitle" @ok="closeErrorModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dialog from '../components/modal/Dialog.vue'
import Modal from '../components/modal/Modal.vue'
import { useEmployeeDelete } from '../composables/useEmployeeDelete'
import { useFeedbackMessage } from '../composables/useFeedbackMessage'

const deleteUserId = ref('')
const deleteDialogVisible = ref(false)

const { deleteEmployee } = useEmployeeDelete()

const {
  errorModalVisible,
  modalTitle,
  openDeleteErrorModal,
  closeErrorModal
} = useFeedbackMessage()

const handleDelete = async () => {
  const result = await deleteEmployee(deleteUserId.value)

  if (!result) {
    openDeleteErrorModal()
  }
}

const handleCancel = () => {
  console.log('削除をキャンセルしました')
}
</script>
