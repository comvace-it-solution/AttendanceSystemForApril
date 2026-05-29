import { ref } from 'vue'

type SnackbarType = 'success' | 'error'

// エラーモーダルの表示/非表示
const errorModalVisible = ref(false)

// エラーモーダルに表示するタイトル
const modalTitle = ref('')

// スナックバーの表示/非表示
const snackbarVisible = ref(false)

// スナックバーに表示するメッセージ
const snackbarMessage = ref('')

// スナックバーの種類
const snackbarType = ref<SnackbarType>('success')

export function useFeedbackMessage() {
  // エラーモーダルを表示する内部処理
  const openErrorModal = (title: string) => {
    modalTitle.value = title
    errorModalVisible.value = true
  }

  // エラーモーダルを閉じる処理
  const closeErrorModal = () => {
    errorModalVisible.value = false
  }

  // 成功スナックバーを表示する内部処理
  const openSuccessSnackbar = (message: string) => {
    snackbarMessage.value = message
    snackbarType.value = 'success'
    snackbarVisible.value = true
  }

  // 失敗スナックバーを表示する内部処理
  const openErrorSnackbar = (message: string) => {
    snackbarMessage.value = message
    snackbarType.value = 'error'
    snackbarVisible.value = true
  }

  // スナックバーを閉じる処理
  const closeSnackbar = () => {
    snackbarVisible.value = false
  }

  // 削除失敗時のエラーモーダルを表示する処理
  const openDeleteErrorModal = () => {
    openErrorModal('従業員情報の削除に失敗しました')
  }

  // 登録失敗時のエラーモーダルを表示する処理
  const openRegisterErrorModal = () => {
    openErrorModal('従業員情報の登録に失敗しました')
  }

  // 編集失敗時のエラーモーダルを表示する処理
  const openEditErrorModal = () => {
    openErrorModal('従業員情報の編集に失敗しました')
  }

  // 削除成功時のスナックバーを表示する処理
  const openDeleteSuccessSnackbar = () => {
    openSuccessSnackbar('従業員情報を削除しました')
  }

  // 新規登録成功時のスナックバーを表示する処理
  const openRegisterSuccessSnackbar = () => {
    openSuccessSnackbar('従業員情報を新規登録しました')
  }

  // 編集完了時のスナックバーを表示する処理
  const openEditCompleteSnackbar = () => {
    openSuccessSnackbar('従業員情報の編集を完了しました')
  }

  // 更新成功時のスナックバーを表示する処理
  const openUpdateSuccessSnackbar = () => {
    openSuccessSnackbar('従業員情報を更新しました')
  }

  // 従業員更新失敗時のスナックバーを表示する処理
  const openUpdateErrorSnackbar = () => {
    openErrorSnackbar('従業員情報の更新に失敗しました')
  }

  // 通信エラー時のスナックバーを表示する処理
  const openCommunicationErrorSnackbar = () => {
    openErrorSnackbar('通信エラーが発生しました')
  }

  // 処理エラー時のスナックバーを表示する処理
  const openProcessErrorSnackbar = () => {
    openErrorSnackbar('処理に失敗しました')
  }

  return {
    errorModalVisible,
    modalTitle,
    snackbarVisible,
    snackbarMessage,
    snackbarType,
    closeErrorModal,
    closeSnackbar,
    openSuccessSnackbar,
    openErrorSnackbar,
    openDeleteErrorModal,
    openRegisterErrorModal,
    openEditErrorModal,
    openDeleteSuccessSnackbar,
    openRegisterSuccessSnackbar,
    openEditCompleteSnackbar,
    openUpdateSuccessSnackbar,
    openUpdateErrorSnackbar,
    openCommunicationErrorSnackbar,
    openProcessErrorSnackbar,
  }
}
