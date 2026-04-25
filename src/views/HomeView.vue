<!-- テスト用画面　マージしない -->

<script setup lang="ts">
import { useAuth } from '../composables/useAuth'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const { logout } = useAuth()
const authStore = useAuthStore()
const router = useRouter()

const onLogoutClick = () => {
  // 1. Piniaの状態とlocalStorageをクリア
  logout()
  
  // 2. ログイン画面へリダイレクト
  router.push('/login')
  
  // 任意：ログアウトしたことを通知
  alert('ログアウトしました')
}
</script>

<template>
  <div class="dashboard-container">
    <p>ユーザー名：{{ authStore.user?.userName }} </p>
    <p>ユーザーID: {{ authStore.user?.userId }} </p>

    <div class="logout-section">
      <button 
        @click="onLogoutClick" 
        class="logout-button"
      >
        ログアウト
      </button>
    </div>
  </div>
</template>

<style scoped>
.logout-button {
  background-color: #f56c6c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #f78989;
}
</style>