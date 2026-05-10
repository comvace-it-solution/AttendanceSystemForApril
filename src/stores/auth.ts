import { defineStore } from 'pinia'
import { fetchCurrentAuthUser } from '../services/authService'

type AuthState = {
  id: number | null
  userId: number | null
  userName: string
  password: string
  isLoading: boolean
  errorMessage: string
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    id: null,
    userId: null,
    userName: '',
    password: '',
    isLoading: false,
    errorMessage: '',
  }),
  actions: {
    async loadCurrentUser() {
      this.isLoading = true
      this.errorMessage = ''

      try {
        const currentUser = await fetchCurrentAuthUser()
        this.id = currentUser.id
        this.userId = currentUser.userId
        this.userName = currentUser.userName
        this.password = currentUser.password
      } catch (error) {
        this.errorMessage =
          error instanceof Error ? error.message : 'ログインユーザー情報の取得に失敗しました。'
        throw error
      } finally {
        this.isLoading = false
      }
    },
  },
})
