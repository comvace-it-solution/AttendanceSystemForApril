<template>
  <div>
    <h2>モーダル動作確認</h2>

    <div style="margin-bottom: 16px;">
      <el-input
        v-model="deleteUserId"
        placeholder="削除するユーザーID"
        style="width: 240px; margin-right: 8px;"
      />

      <el-button type="danger" @click="handleDelete">
        削除API実行
      </el-button>
    </div>

    <div style="margin-bottom: 16px;">
      <el-input
        v-model="registerUserName"
        placeholder="登録するユーザー名"
        style="width: 240px; margin-right: 8px;"
      />

      <el-button type="primary" @click="handleRegister">
        登録API実行
      </el-button>
    </div>

    <div style="margin-bottom: 16px;">
      <el-input
        v-model="editUserId"
        placeholder="編集するユーザーID"
        style="width: 240px; margin-right: 8px;"
      />

      <el-input
        v-model="editUserName"
        placeholder="編集後のユーザー名"
        style="width: 240px; margin-right: 8px;"
      />

      <el-button type="warning" @click="handleEdit">
        編集API実行
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
import Modal from '../components/modal/Modal.vue'
import { useEmployeeActions } from '../composables/useEmployeeActions'

const {
  deleteUserId,
  registerUserName,
  editUserId,
  editUserName,
  errorModalVisible,
  modalTitle,
  handleDelete,
  handleRegister,
  handleEdit,
  closeErrorModal
} = useEmployeeActions()
</script>