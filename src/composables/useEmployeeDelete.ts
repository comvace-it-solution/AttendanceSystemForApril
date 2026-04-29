import axios from 'axios'

export function useEmployeeDelete() {
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
  const INTERNAL_API_KEY = import.meta.env.VITE_INTERNAL_API_KEY

  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': INTERNAL_API_KEY
  }

  // 従業員削除APIを実行
  const deleteEmployee = async (userId: string) => {
    try {
      // 削除リクエストを送信
      await axios.delete(`${SUPABASE_URL}/functions/v1/users/${userId}`, {
        headers
      })

      // 削除成功時は true を返す
      console.log('削除成功')
      return true
    } catch (error: any) {
      // 削除失敗時はエラー内容をコンソールに出す
      console.error('従業員削除エラー:', error.response?.data || error)

      // 削除失敗時は false を返す
      return false
    }
  }

  return {
    deleteEmployee
  }
}