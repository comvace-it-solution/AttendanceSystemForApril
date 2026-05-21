import { reactive, ref, computed } from 'vue'
import axios from 'axios'
import { useFeedbackMessage } from './useFeedbackMessage.ts'

export function useEmployeeRegister() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const INTERNAL_API_KEY = import.meta.env.VITE_INTERNAL_API_KEY
  const { openCommunicationErrorSnackbar } = useFeedbackMessage()

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

  const registerError = ref('')

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

  const onRegister = async () => {
    registerError.value = ''

    try {
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
      const status = error.response?.status

      if (status !== undefined && status >= 400 && status < 500) {
        registerError.value = '入力内容に誤りがあります。'
      } else {
        registerError.value = ''
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
