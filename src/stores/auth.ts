import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    id: 1,
    userId: 'master_user_001',
    userName: 'マスターユーザー',
    password: 'password123',
  }),
})
