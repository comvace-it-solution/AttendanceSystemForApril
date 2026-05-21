import axios from 'axios'
import { ref } from 'vue'
import { useFeedbackMessage } from './useFeedbackMessage'

/** 従業員編集API送信用フォーム型 */
interface EmployeeEditForm {
  userName: string
  password?: string
  email: string
  phoneNumber: string
  postalCode: string
  prefecture: string
  streetAddress: string
  buildingName: string
  birthDate: string
  assignmentDate: string
}

/**
 * 従業員編集 composable
 * @remarks
 * editError：編集エラーメッセージ
 * updateEmployee：編集API実行
 */
export function useEmployeeEdit() {
  /** API Base URL */
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  /** 内部APIキー */
  const INTERNAL_API_KEY = import.meta.env.VITE_INTERNAL_API_KEY

  /** 通信エラーSnackbar */
  const { openCommunicationErrorSnackbar } = useFeedbackMessage()

  /** 編集エラーメッセージ */
  const editError = ref('')

  /**
   * 従業員編集API
   * @param userId 従業員ID
   * @param form 編集フォーム
   * @param isPasswordChange パスワード変更有無
   */
  const updateEmployee = async (
    userId: number,
    form: EmployeeEditForm,
    isPasswordChange: boolean,
  ) => {
    /** エラー初期化 */
    editError.value = ''

    /**
     * パスワード変更なし
     * password を除外
     */
    const requestBody = isPasswordChange
      ? form
      : {
          userName: form.userName,
          email: form.email,
          phoneNumber: form.phoneNumber,
          postalCode: form.postalCode,
          prefecture: form.prefecture,
          streetAddress: form.streetAddress,
          buildingName: form.buildingName,
          birthDate: form.birthDate,
          assignmentDate: form.assignmentDate,
        }

    try {
      /** API実行 */
      const response = await axios.put(
        `${API_BASE_URL}/users/${userId}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': INTERNAL_API_KEY,
          },
        },
      )

      return response.data
    } catch (error: any) {
      /** エラーログ */
      console.log('従業員編集APIエラー status', error.response?.status)
      console.log('従業員編集APIエラー data', error.response?.data)

      /** 4xxエラー */
      if (error.response?.status >= 400 && error.response?.status < 500) {
        editError.value = '入力内容に誤りがあります。'
      } else {
        /** 通信エラーSnackbar */
        openCommunicationErrorSnackbar()
      }

      throw error
    }
  }

  return {
    editError,
    updateEmployee,
  }
}
