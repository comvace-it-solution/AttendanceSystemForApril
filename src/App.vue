<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
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

const route = useRoute()
const isLearningRoute = computed(() => route.path.startsWith('/learning'))
</script>

<template>
  <AppHeader v-if="!isLearningRoute" />
  <div v-if="!isLearningRoute" style="height: var(--app-header-height)"></div>
  <Snackbar v-model="snackbarVisible" :message="snackbarMessage" :type="snackbarType" />
  <Modal v-model="errorModalVisible" :title="modalTitle" />
  <RouterView />
</template>
