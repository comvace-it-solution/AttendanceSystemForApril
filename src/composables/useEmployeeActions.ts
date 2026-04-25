import { ref } from 'vue'
import axios from 'axios'

export function useEmployeeActions() {
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

  const deleteUserId = ref('')
  const registerUserName = ref('')
  const editUserId = ref('')
  const editUserName = ref('')

  const errorModalVisible = ref(false)
  const modalTitle = ref('')

  const headers = {
    'Content-Type': 'application/json',
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`
  }

  const openErrorModal = (title: string) => {
    modalTitle.value = title
    errorModalVisible.value = true
  }

  const closeErrorModal = () => {
    errorModalVisible.value = false
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${SUPABASE_URL}/functions/v1/users/${deleteUserId.value}`, {
        headers
      })

      console.log('削除成功')
    } catch (error: any) {
      console.error('従業員削除エラー:', error.response?.data || error)
      openErrorModal('従業員情報の削除に失敗しました')
    }
  }

  const handleRegister = async () => {
    try {
      await axios.post(`${SUPABASE_URL}/functions/v1/users`, {
        userName: registerUserName.value
      }, {
        headers
      })

      console.log('登録成功')
    } catch (error: any) {
      console.error('従業員登録エラー:', error.response?.data || error)
      openErrorModal('従業員情報の登録に失敗しました')
    }
  }

  const handleEdit = async () => {
    try {
      await axios.put(`${SUPABASE_URL}/functions/v1/users/${editUserId.value}`, {
        userName: editUserName.value
      }, {
        headers
      })

      console.log('編集成功')
    } catch (error: any) {
      console.error('従業員編集エラー:', error.response?.data || error)
      openErrorModal('従業員情報の編集に失敗しました')
    }
  }

  return {
    deleteUserId,
    registerUserName,
    editUserId,
    editUserName,
    errorModalVisible,
    modalTitle,
    handleDelete,
    handleRegister,
    handleEdit,
    closeErrorModal
  }
}