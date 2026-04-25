<template>
  <div class="container">
    <el-dialog v-model="dialogVisible" :show-close="false" :title="title" width="260px" height="128px" class="custom-dialog" :close-on-click-modal="false" :align-center="true">
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" color="#0D2B81" style="color: #FFFFFF;" @click="handleOkClick" class="ok-button">
            OK
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'ok'): void
}>()

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

const handleOkClick = () => {
  dialogVisible.value = false
  emit('ok')
}
</script>

<style scoped lang="scss">
/* ダイアログ全体のカスタマイズ */
:deep(.custom-dialog) {
  background-color: #E88CA0 !important;
  border-radius: 12px;
  overflow: hidden;
  padding-left: 10px;
  padding-right: 10px;
}

/* ヘッダーのカスタマイズ */
:deep(.custom-dialog .el-dialog__header) {
  margin-right: 0;
  padding: 0%;
  text-align: center;
}

:deep(.custom-dialog .el-dialog__title) {
  color: #000000 !important;
  font-size: 16px;
}

/* フッターのカスタマイズ */
:deep(.custom-dialog .el-dialog__footer) {
  padding-top: 20px;
  text-align: center;
}

/* ボタンのカスタマイズ */
.ok-button {
  width: 146px;
  height: 59px;
  border-radius: 11px;
}
</style>