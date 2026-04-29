<template>
  <div class="container">
    <el-dialog v-model="dialogVisible" :show-close="false" title="この従業員情報を削除しますか？" width="342px" height="128px" class="custom-dialog" :close-on-click-modal="false" :align-center="true">
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" color="#D32F2F" style="color: #FFFFFF;" @click="handleDeleteClick" class="button">
            削除
          </el-button>
          <el-button @click="handleCancelClick" class="cancel-button">キャンセル</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'delete'): void
  (e: 'cancel'): void
}>()

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

const handleDeleteClick = () => {
  dialogVisible.value = false
  emit('delete')
}

const handleCancelClick = () => {
  dialogVisible.value = false
  emit('cancel')
}
</script>

<style scoped>
.container {
  padding: 20px;
}

/* ダイアログ全体のカスタマイズ */
:deep(.custom-dialog) {
  background-color: #E88CA0 !important;
  border-radius: 12px;
  overflow: hidden;
}

/* ヘッダーのカスタマイズ */
:deep(.custom-dialog .el-dialog__header) {
  margin-right: 0;
  padding: 0%;
  text-align: center;
}

:deep(.custom-dialog .el-dialog__title) {
  color: #000000 !important;
}

/* ボディ（中身）のカスタマイズ */
:deep(.custom-dialog .el-dialog__body) {
  font-size: 16px;
  line-height: 1.6;
}

/* フッターのカスタマイズ */
:deep(.custom-dialog .el-dialog__footer) {
  padding-top: 20px;
  text-align: center;
}

/* ボタンのカスタマイズ */
.button {
  width: 146px;
  height: 59px;
  border-radius: 11px;
}

.cancel-button {
  width: 146px;
  height: 59px;
  border-radius: 11px;
}
</style>
