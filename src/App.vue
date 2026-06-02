<script setup lang="ts">
import AppHeader from '@/components/layout/header/AppHeader.vue'
import Snackbar from '@/components/modal/Snackbar.vue'
import { useFeedbackMessage } from '@/composables/useFeedbackMessage'
import Modal from '@/components/modal/Modal.vue'

const {
  snackbarVisible,
  snackbarMessage,
  snackbarType,
  errorModalVisible,
  modalTitle,
} = useFeedbackMessage()
</script>

<template>
  <AppHeader />
  <div style="height: var(--app-header-height)"></div>
  <Snackbar v-model="snackbarVisible" :message="snackbarMessage" :type="snackbarType" />
  <Modal v-model="errorModalVisible" :title="modalTitle" />
  <RouterView />
</template>
