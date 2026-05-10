import { defineStore } from 'pinia'
import { fetchCurrentAuthUser } from '../services/authService'
import type { User } from '../types/auth'

type AuthState = {
  id: number | null
  user: User | null
  userId: number | null
  userName: string
  password: string
  isLoading: boolean
  errorMessage: string
}

const readStoredUser = (): User | null => {
  const storedUser = localStorage.getItem('user')

  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser) as User
  } catch {
    localStorage.removeItem('user')
    return null
  }
}

const storedUser = readStoredUser()
const normalizeUserId = (userId: string | number) => {
  const numericUserId = Number(userId)
  return Number.isFinite(numericUserId) ? numericUserId : null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    id: null,
    user: storedUser,
    userId: storedUser ? normalizeUserId(storedUser.userId) : null,
    userName: storedUser?.userName ?? '',
    password: '',
    isLoading: false,
    errorMessage: '',
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    setAuth(userId: string | number, userName: string) {
      this.user = { userId, userName }
      this.userId = normalizeUserId(userId)
      this.userName = userName
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    logout() {
      this.id = null
      this.user = null
      this.userId = null
      this.userName = ''
      this.password = ''
      this.errorMessage = ''
      localStorage.removeItem('user')
    },
    async loadCurrentUser() {
      this.isLoading = true
      this.errorMessage = ''

      try {
        const currentUser = await fetchCurrentAuthUser()
        this.id = currentUser.id
        this.password = currentUser.password
        this.setAuth(currentUser.userId, currentUser.userName)
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
