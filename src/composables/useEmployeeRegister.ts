import { reactive, ref, computed } from 'vue'
import axios from 'axios'
import { useFeedbackMessage } from './useFeedbackMessage.ts'

/**
 * 従業員登録 composable
 * @remarks
 * form：登録フォーム
 * onRegister：登録API実行
 */
export function useEmployeeRegister() {
  /** API Base URL */
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  /** 内部APIキー */
  const INTERNAL_API_KEY = import.meta.env.VITE_INTERNAL_API_KEY

  /** 通信エラーSnackbar */
  const {
    openCommunicationErrorSnackbar,
    openRegisterErrorModal,
    openProcessErrorSnackbar,
  } = useFeedbackMessage()

  /** 登録フォーム */
  const form = reactive({
    userName: '',
    password: '',
    email: '',
    phoneNumber: '',
    postalCode: '',
    prefecture: '',
    streetAddress: '',
    buildingName: '',
    birthDate: '',
    assignmentDate: '',
  })

  /** 登録エラーメッセージ */
  const registerError = ref('')

  /** 登録ボタン活性状態 */
  const isRegisterDisabled = computed(() => {
    return (
      !form.userName ||
      !form.password ||
      !form.email ||
      !form.phoneNumber ||
      !form.postalCode ||
      !form.prefecture ||
      !form.streetAddress ||
      !form.birthDate ||
      !form.assignmentDate
    )
  })

  /** 従業員登録API */
  const onRegister = async () => {
    /** エラー初期化 */
    registerError.value = ''

    try {
      // // テスト用あとで消す
      // throw {
      //   response: {
      //     status: 400,
      //     data: {
      //       message: 'email はすでに登録されています。',
      //     },
      //   },
      // }
      /** API実行 */
      const response = await axios.post(
        `${API_BASE_URL}/users`,
        {
          userName: form.userName,
          password: form.password,
          email: form.email,
          phoneNumber: form.phoneNumber,
          postalCode: form.postalCode,
          prefecture: form.prefecture,
          streetAddress: form.streetAddress,
          buildingName: form.buildingName,
          birthDate: form.birthDate,
          assignmentDate: form.assignmentDate,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': INTERNAL_API_KEY,
          },
        },
      )

      return response.data
    } catch (error: any) {
      console.log('登録APIエラー status', error.response?.status)
      console.log('登録APIエラー data', error.response?.data)
      console.log('登録APIエラー message', error.message)
      /** ステータスコード */
      const status = error.response?.status

      /** メールアドレスチェックの為 409エラー 画面に渡す */
      if (status === 409) {
        throw error
      }
      if (status === 500) {
        /** 500エラー 登録失敗モーダル表示 */
        openRegisterErrorModal()
      } else if (status !== undefined && status >= 400 && status < 500) {
        /** 400系エラー スナックバー表示 */
        openProcessErrorSnackbar()
      } else {
        /** 通信エラー */
        openCommunicationErrorSnackbar()
      }

      throw error
    }
  }

  return {
    form,
    registerError,
    isRegisterDisabled,
    onRegister,
  }
}
