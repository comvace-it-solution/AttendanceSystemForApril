import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import type { User } from '../types/auth.ts'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value);

  // 認証情報を保存
  const setAuth = (userId: string | number, userName: string) => {
    user.value = { userId, userName }
    localStorage.setItem('user', JSON.stringify(user.value))
    console.log('ユーザーID:', userId, 'ユーザー名:', userName)
  }
  
  // ログアウト処理
  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  return {
    user,
    isAuthenticated,
    setAuth,
    logout
  }
});