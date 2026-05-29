<script setup lang="ts">
import AppHeader from '@/components/layout/header/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <div style="height: var(--app-header-height)"></div>
  <RouterView />
</template>
