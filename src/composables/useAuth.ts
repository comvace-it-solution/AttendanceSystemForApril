import { ref,reactive,computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth.ts'
// import { useSnackbar } from '../components/modal/snackbar.ts'

export function useAuth() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const INTERNAL_API_KEY = import.meta.env.VITE_INTERNAL_API_KEY
  const authStore = useAuthStore()
  // const { showErrorMessage } = useSnackbar()
  const form = reactive({
    email: '',
    password: ''
  })

  const emailError = ref('')
  const passwordError = ref('')
  const loginError = ref('')

  const validateEmail = () => {
    // メールアドレス必須チェック
    const value = form.email.trim();
    if (!value) {
      emailError.value = '※必須項目です。';
      console.error('メールアドレスは必須です')
      return
    }
    // メールアドレス形式チェック
    const emailRegex = /^[!-~]+@[!-~]+\.[!-~]+$/
    if (!emailRegex.test(form.email)) {
      emailError.value = '※メールアドレスの形式が間違っています。xxxxx@xxx.xxxで入力してください。';
      console.error('メールアドレスの形式が間違っています')
    }
    else {
      emailError.value = '';
    }
  }

  const validatePassword = () => {
    // パスワード必須チェック
    const value = form.password.trim();
    if (!value) {
      passwordError.value = '※必須項目です。';
      console.error('パスワードは必須です')
    }
    // パスワード形式チェック
    else if (form.password.length !== 6) {
      passwordError.value = '※半角英数字6文字で入力してください。';
      console.error('パスワードを半角英数字6文字で入力してください')
    }
    else {
      passwordError.value = '';
    }
  }

  const isLoginDisabled = computed(() => {
    return !form.email || !form.password || emailError.value !== '' || passwordError.value !== '';
  })

  // ログインボタンの処理
  const onLogin = async () => {
    loginError.value = '';
    try {
      console.log('送信開始:', form)
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: form.email,
        password: form.password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': INTERNAL_API_KEY
        }
      })

      // ログイン成功時
      // ユーザー情報とトークンをストアに保存
      authStore.setAuth(response.data.data.userId, response.data.data.userName)
      
      // メッセージクリア（先にすることで、ログイン成功後にエラーが残るのを防止）
      emailError.value = '';
      passwordError.value = '';
      loginError.value = '';
      // フォームの内容をクリア
      form.email = '';
      form.password = '';

      console.log('ログイン成功:', response.data)
      return response.data
      
      // ログインエラー時
    } catch (error: any) {
      const status = error.response?.status
      if (status >= 400 && status < 500) {
        loginError.value = 'メールアドレスまたはパスワードが異なります。';
      } else{
        loginError.value = '';
        // showErrorMessage('サーバーエラー')
      }
      console.error('ログインエラー:', error.response?.data || error)
      throw error
    }
  }

  return {
    validateEmail,
    validatePassword,
    onLogin,
    isLoginDisabled,
    form,
    emailError,
    passwordError,
    loginError,
    logout: authStore.logout
  }
}