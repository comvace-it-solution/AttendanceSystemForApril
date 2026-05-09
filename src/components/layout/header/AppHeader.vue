<template>
  <component :is="isMobile ? AppHeaderMobile : AppHeaderDesktop" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import AppHeaderDesktop from './AppHeaderDesktop.vue'
import AppHeaderMobile from './AppHeaderMobile.vue'

const width = ref(0)
const onResize = () => {
  width.value = window.innerWidth
}

onMounted(() => {
  width.value = window.innerWidth
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})

const isMobile = computed(() => width.value < 600)
</script>

<script lang="ts">
export default {}
</script>
