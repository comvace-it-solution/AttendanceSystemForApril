<template>
  <div v-if="modelValue" class="sort-sheet-overlay">
    <div class="sort-sheet">
      <div class="sort-sheet__title">
        ソート
      </div>

      <div class="sort-sheet__section-title">
        並べ替え項目
      </div>

      <div class="sort-sheet__radio-list">
        <label>
          <input v-model="selectedSortKey" type="radio" value="userId" />
          従業員ID
        </label>

        <label>
          <input v-model="selectedSortKey" type="radio" value="userName" />
          氏名
        </label>

        <label>
          <input v-model="selectedSortKey" type="radio" value="birthDate" />
          生年月日
        </label>

        <label>
          <input v-model="selectedSortKey" type="radio" value="assignedDate" />
          配属日
        </label>

        <label>
          <input v-model="selectedSortKey" type="radio" value="attendanceStatus" />
          勤務状態
        </label>
      </div>

      <div class="sort-sheet__section-title">
        並び順
      </div>

      <div class="sort-sheet__order-list">
        <label>
          <input v-model="selectedSortOrder" type="radio" value="asc" />
          昇順
        </label>

        <label>
          <input v-model="selectedSortOrder" type="radio" value="desc" />
          降順
        </label>
      </div>

      <div class="sort-sheet__button-area">
        <button class="cancel-button" @click="handleCancel">
          キャンセル
        </button>

        <button class="apply-button" @click="handleApply">
          適用
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

type SortKey = 'userId' | 'userName' | 'birthDate' | 'assignedDate' | 'attendanceStatus'
type SortOrder = 'asc' | 'desc'

const props = defineProps<{
  modelValue: boolean
  sortKey: SortKey
  sortOrder: SortOrder
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'apply', sortKey: SortKey, sortOrder: SortOrder): void
}>()

const selectedSortKey = ref<SortKey>(props.sortKey)
const selectedSortOrder = ref<SortOrder>(props.sortOrder)

watch(
  () => props.modelValue,
  () => {
    selectedSortKey.value = props.sortKey
    selectedSortOrder.value = props.sortOrder
  }
)

const handleCancel = () => {
  emit('update:modelValue', false)
}

const handleApply = () => {
  emit('apply', selectedSortKey.value, selectedSortOrder.value)
  emit('update:modelValue', false)
}
</script>

<style scoped lang="scss">
.sort-sheet-overlay {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sort-sheet {
  width: 402px;
  min-height: 220px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 8px 16px 14px;
  box-sizing: border-box;
}

.sort-sheet__title {
  width: 240px;
  height: 19px;
  margin: 0 auto 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
  line-height: 19px;
}

.sort-sheet__section-title {
  font-size: 12px;
  margin-bottom: 6px;
}

.sort-sheet__radio-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 11px;
  margin-bottom: 10px;
}

.sort-sheet__order-list {
  display: flex;
  gap: 80px;
  font-size: 11px;
  margin-bottom: 14px;
}

.sort-sheet__button-area {
  display: flex;
  justify-content: center;
  gap: 14px;
}

.cancel-button {
  width: 85px;
  height: 16px;
  border: none;
  border-radius: 4px;
  background-color: #dddddd;
  color: #000000;
  font-size: 10px;
  cursor: pointer;
}

.apply-button {
  width: 85px;
  height: 16px;
  border: none;
  border-radius: 4px;
  background-color: #0d2b81;
  color: #ffffff;
  font-size: 10px;
  cursor: pointer;
}
</style>
