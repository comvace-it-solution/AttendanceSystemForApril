<template>
  <div class="test-container">
    <h2>モーダル・ダイアログ・スナックバー テスト用画面</h2>
    <div class="test-section">
      <h4>【ダイアログ】</h4>
      <div class="button-group">
        <el-button @click="triggerOpenDeleteDialog">openDeleteDialog()</el-button>
        <el-button @click="triggerOpenRegisterDialog">openRegisterDialog()</el-button>
        <el-button @click="triggerOpenEditDialog">openEditDialog()</el-button>
      </div>
    </div>

    <div class="test-section">      
      <div class="direct-test-grid">
        <div class="card">
          <h4>【エラーモーダル (Modal)】</h4>
          <div class="button-group-vertical">
            <el-button size="small" @click="triggerOpenDeleteErrorModal">openDeleteErrorModal()</el-button>
            <el-button size="small" @click="triggerOpenRegisterErrorModal">openRegisterErrorModal()</el-button>
            <el-button size="small" @click="triggerOpenEditErrorModal">openEditErrorModal()</el-button>
          </div>
        </div>

        <div class="card">
          <h4>【成功スナックバー】</h4>
          <div class="button-group-vertical">
            <el-button size="small" @click="triggerOpenDeleteSuccessSnackbar">openDeleteSuccessSnackbar()</el-button>
            <el-button size="small" @click="triggerOpenRegisterSuccessSnackbar">openRegisterSuccessSnackbar()</el-button>
            <el-button size="small" @click="triggerOpenEditCompleteSnackbar">openEditCompleteSnackbar()</el-button>
            <el-button size="small" @click="triggerOpenUpdateSuccessSnackbar">openUpdateSuccessSnackbar()</el-button>
          </div>
        </div>

        <div class="card">
          <h4>【システム例外・エラー】</h4>
          <div class="button-group-vertical">
            <el-button size="small" @click="triggerOpenUpdateErrorSnackbar">openUpdateErrorSnackbar()</el-button>
            <el-button size="small" @click="triggerOpenCommunicationErrorSnackbar">openCommunicationErrorSnackbar()</el-button>
            <el-button size="small" @click="triggerOpenProcessErrorSnackbar">openProcessErrorSnackbar()</el-button>
          </div>
        </div>
      </div>
    </div>

    <Dialog
      v-model="dialogVisibleSync"
      :title="dialogTitle"
      :confirm-text="confirmButtonText"
      :confirm-button-color="confirmButtonColor"
      @confirm="handleDialogConfirm"
      @cancel="handleDialogCancel"
    />

    <Modal
      v-model="errorModalVisibleSync"
      :title="modalTitle"
      @ok="handleModalOk"
    />

    <Snackbar
      v-model="snackbarVisibleSync"
      :message="snackbarMessage"
      :type="snackbarType"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Dialog from '../components/modal/Dialog.vue'
import Modal from '../components/modal/Modal.vue'
import Snackbar from '../components/modal/Snackbar.vue'
import { useDialogMessage } from '../composables/useDialogMessage'
import { useFeedbackMessage } from '../composables/useFeedbackMessage'


const {
  dialogVisible, dialogTitle, confirmButtonText, confirmButtonColor,
  openDeleteDialog, openRegisterDialog, openEditDialog
} = useDialogMessage()

const {
  errorModalVisible, modalTitle, snackbarVisible, snackbarMessage, snackbarType,
  openDeleteErrorModal, openRegisterErrorModal, openEditErrorModal,
  openDeleteSuccessSnackbar, openRegisterSuccessSnackbar, openEditCompleteSnackbar,
  openUpdateSuccessSnackbar, openUpdateErrorSnackbar, openCommunicationErrorSnackbar, openProcessErrorSnackbar
} = useFeedbackMessage()

// ─── 1. v-model の変更通知（呼ばれた形跡）をキャッチするための Computed ───
const dialogVisibleSync = computed({
  get: () => dialogVisible.value,
  set: (val) => {
    dialogVisible.value = val
  }
})

const errorModalVisibleSync = computed({
  get: () => errorModalVisible.value,
  set: (val) => {
    errorModalVisible.value = val
  }
})

const snackbarVisibleSync = computed({
  get: () => snackbarVisible.value,
  set: (val) => {
    snackbarVisible.value = val
  }
})

// ─── 2. 親のボタンが押された時の「呼ばれたログ」 ───
const triggerOpenDeleteDialog = () => { 
  console.log('▶ [Call] openDeleteDialog() を実行しました'); 
  openDeleteDialog() }
const triggerOpenRegisterDialog = () => { 
  console.log('▶ [Call] openRegisterDialog() を実行しました'); 
  openRegisterDialog() }
const triggerOpenEditDialog = () => { 
  console.log('▶ [Call] openEditDialog() を実行しました'); 
  openEditDialog() }

const triggerOpenDeleteErrorModal = () => { 
  console.log('▶ [Call] openDeleteErrorModal() を実行しました'); 
  openDeleteErrorModal() }
const triggerOpenRegisterErrorModal = () => { 
  console.log('▶ [Call] openRegisterErrorModal() を実行しました'); 
  openRegisterErrorModal() }
const triggerOpenEditErrorModal = () => { 
  console.log('▶ [Call] openEditErrorModal() を実行しました'); 
  openEditErrorModal() }

const triggerOpenDeleteSuccessSnackbar = () => { 
  console.log('▶ [Call] openDeleteSuccessSnackbar() を実行しました'); 
  openDeleteSuccessSnackbar() }
const triggerOpenRegisterSuccessSnackbar = () => { 
  console.log('▶ [Call] openRegisterSuccessSnackbar() を実行しました'); 
  openRegisterSuccessSnackbar() }
const triggerOpenEditCompleteSnackbar = () => { 
  console.log('▶ [Call] openEditCompleteSnackbar() を実行しました'); 
  openEditCompleteSnackbar() }
const triggerOpenUpdateSuccessSnackbar = () => { 
  console.log('▶ [Call] openUpdateSuccessSnackbar() を実行しました'); 
  openUpdateSuccessSnackbar() }

const triggerOpenUpdateErrorSnackbar = () => { 
  console.log('▶ [Call] openUpdateErrorSnackbar() を実行しました'); 
  openUpdateErrorSnackbar() }
const triggerOpenCommunicationErrorSnackbar = () => { 
  console.log('▶ [Call] openCommunicationErrorSnackbar() を実行しました'); 
  openCommunicationErrorSnackbar() }
const triggerOpenProcessErrorSnackbar = () => { 
  console.log('▶ [Call] openProcessErrorSnackbar() を実行しました'); 
  openProcessErrorSnackbar() }

// ─── 3. 子画面からイベント（Emit）が飛んできた時の「呼ばれたログ」 ───
const handleDialogConfirm = () => {
  console.log('Dialog.vue から confirm が呼ばれました')
}

const handleDialogCancel = () => {
  console.log('Dialog.vue から cancel が呼ばれました')
}

const handleModalOk = () => {
  console.log('Modal.vue から ok が呼ばれました')
}
</script>

<style scoped>
.test-container { padding: 24px; max-width: 800px; margin: 0 auto; font-family: sans-serif; color: #333; }
h3 { margin: 0 0 8px 0; font-size: 16px; color: #1f2f3d; }
h4 { margin: 0 0 8px 0; font-size: 13px; color: #606266; border-bottom: 1px solid #e4e7ed; padding-bottom: 4px; }
.description { text-align: center; color: #606266; font-size: 13px; margin-bottom: 24px; line-height: 1.4; }
.section-desc { font-size: 12px; color: #909399; margin: 0 0 12px 0; }
.test-section { background: #fff; border: 1px solid #ebeef5; border-radius: 4px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
.button-group { display: flex; gap: 12px; }
.direct-test-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.button-group-vertical { display: flex; flex-direction: column; gap: 8px; }
.button-group-vertical .el-button { margin-left: 0 !important; text-align: left; justify-content: flex-start; width: 100%; font-size: 11px; }
</style>