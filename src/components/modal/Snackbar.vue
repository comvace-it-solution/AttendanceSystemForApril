<template>
  <div v-if="snackbarVisible" :class="snackbarClass">
    <p class="snackbar__message">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

type SnackbarType = 'success' | 'error'

type Props = {
  modelValue: boolean
  message?: string
  duration?: number
  type?: SnackbarType
}

const props = withDefaults(defineProps<Props>(), {
  message: '',
  duration: 4000,
  type: 'success',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const snackbarVisible = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

const snackbarClass = computed(() => {
  return props.type === 'error'
    ? 'snackbar snackbar--error'
    : 'snackbar snackbar--success'
})

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      window.setTimeout(() => {
        snackbarVisible.value = false
      }, props.duration)
    }
  },
)
</script>

<style scoped lang="scss">
.snackbar {
  position: fixed;
  right: 10%;
  bottom: 20%;
  width: 361px;
  min-height: 30px;
  font-size: 16px;
  margin: 5.5px 84px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.snackbar--success {
  border: 1px solid #8fd19e;
  background: #e7f4ea;
}

.snackbar--success .snackbar__message {
  color: #2e9b4b;
}

.snackbar--error {
  border: 1px solid #f5a9a9;
  background: #fdecea;
}

.snackbar--error .snackbar__message {
  color: #c62828;
}

.snackbar__message {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
}
</style>
