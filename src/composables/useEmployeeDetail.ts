import { ref } from 'vue'
import axios from 'axios'
import { useFeedbackMessage } from './useFeedbackMessage'

/**
 * 従業員詳細型
 */
interface EmployeeDetail {
  /** 従業員ID */
  id: number

  /** ユーザー名 */
  userName: string

  /** メールアドレス */
  email: string

  /** 電話番号 */
  phoneNumber: string

  /** 郵便番号 */
  postalCode: string

  /** 都道府県 */
  prefecture: string

  /** 住所 */
  streetAddress: string

  /** 建物名 */
  buildingName: string

  /** 生年月日 */
  birthDate: string

  /** 配属日 */
  assignmentDate: string
}

/**
 * 従業員詳細取得 composable
 */
export function useEmployeeDetail() {
  /**
   * API Base URL
   */
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  /**
   * 内部APIキー
   */
  const INTERNAL_API_KEY = import.meta.env.VITE_INTERNAL_API_KEY

  /**
   * 通信エラーSnackbar
   */
  const { openCommunicationErrorSnackbar } = useFeedbackMessage()

  /**
   * 従業員詳細
   */
  const employeeDetail = ref<EmployeeDetail | null>(null)

  /**
   * ローディング状態
   */
  const isLoading = ref(false)

  /**
   * 従業員詳細取得
   * @param userId 従業員ID
   */
  const fetchEmployeeDetail = async (userId: number) => {
    isLoading.value = true

    try {
      /**
       * API実行
       */
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`, {
        headers: {
          'x-api-key': INTERNAL_API_KEY,
        },
      })

      /**
       * 取得データ格納
       */
      employeeDetail.value = response.data.data

      return response.data.data
    } catch (error: any) {
      /**
       * エラーログ
       */
      console.error('従業員詳細取得エラー', error)

      /**
       * 通信エラーSnackbar表示
       */
      openCommunicationErrorSnackbar()

      throw error
    } finally {
      /**
       * ローディング終了
       */
      isLoading.value = false
    }
  }

  return {
    employeeDetail,
    isLoading,
    fetchEmployeeDetail,
  }
}
