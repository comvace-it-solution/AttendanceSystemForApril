import { ref } from 'vue'

export function useFeedbackMessage() {
  // エラーモーダルの表示/非表示
  const errorModalVisible = ref(false)

  // エラーモーダルに表示するタイトル
  const modalTitle = ref('')

  // スナックバーの表示/非表示
  const snackbarVisible = ref(false)

  // スナックバーに表示するメッセージ
  const snackbarMessage = ref('')

  // エラーモーダルを表示する共通処理
  const openErrorModal = (title: string) => {
    modalTitle.value = title
    errorModalVisible.value = true
  }

  // エラーモーダルを閉じる処理
  const closeErrorModal = () => {
    errorModalVisible.value = false
  }

  // 成功スナックバーを表示する共通処理
  const openSuccessSnackbar = (message: string) => {
    snackbarMessage.value = message
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

  // 削除成功時のスナックバーを表示する処理
  const openDeleteSuccessSnackbar = () => {
    openSuccessSnackbar('従業員情報を削除しました')
  }

  // 登録失敗時のエラーモーダルを表示する処理
  // 登録API自体は登録画面担当が実装する
  const openRegisterErrorModal = () => {
    openErrorModal('従業員情報の登録に失敗しました')
  }

  // 編集失敗時のエラーモーダルを表示する処理
  // 編集API自体は編集画面担当が実装する
  const openEditErrorModal = () => {
    openErrorModal('従業員情報の編集に失敗しました')
  }

  return {
    errorModalVisible,
    modalTitle,
    snackbarVisible,
    snackbarMessage,
    openErrorModal,
    closeErrorModal,
    openSuccessSnackbar,
    closeSnackbar,
    openDeleteErrorModal,
    openDeleteSuccessSnackbar,
    openRegisterErrorModal,
    openEditErrorModal
  }
}