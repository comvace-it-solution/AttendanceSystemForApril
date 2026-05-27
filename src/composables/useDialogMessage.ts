import { computed, ref } from "vue";

type DialogType = "delete" | "register" | "edit";

// ダイアログの表示/非表示
const dialogVisible = ref(false);

// ダイアログの種類
const dialogType = ref<DialogType>("delete");

// ダイアログに表示するタイトル
const dialogTitle = computed(() => {
  if (dialogType.value === "delete") {
    return "この従業員情報を削除しますか？";
  }

  if (dialogType.value === "register") {
    return "この従業員情報で登録しますか？";
  }

  return "この従業員情報を編集しますか？";
});

const confirmButtonText = computed(() => {
  if (dialogType.value === "delete") {
    return "削除";
  }

  if (dialogType.value === "register") {
    return "登録";
  }

  return "編集";
});

const confirmButtonColor = computed(() => {
  if (dialogType.value === "delete") {
    return "#D32F2F";
  }

  return "#0D2B81";
});

export function useDialogMessage() {
  // ダイアログを表示する内部処理
  const openDialog = (type: DialogType) => {
    dialogType.value = type;
    dialogVisible.value = true;
  };

  // ダイアログを閉じる処理
  const closeDialog = () => {
    dialogVisible.value = false;
  };

  // 削除確認ダイアログを表示する処理
  const openDeleteDialog = () => {
    openDialog("delete");
  };

  // 登録確認ダイアログを表示する処理
  const openRegisterDialog = () => {
    openDialog("register");
  };

  // 編集確認ダイアログを表示する処理
  const openEditDialog = () => {
    openDialog("edit");
  };

  return {
    dialogVisible,
    dialogTitle,
    confirmButtonText,
    confirmButtonColor,
    closeDialog,
    openDeleteDialog,
    openRegisterDialog,
    openEditDialog,
  };
}
