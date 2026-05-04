import axios from "axios";

type DeleteResult =
  | "success"
  | "notFound"
  | "communicationError"
  | "processError";

export function useEmployeeDelete() {
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const INTERNAL_API_KEY = import.meta.env.VITE_INTERNAL_API_KEY;

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": INTERNAL_API_KEY,
  };

  // 従業員削除APIを実行し、結果の種類を返す処理
  const deleteEmployee = async (userId: string): Promise<DeleteResult> => {
    try {
      await axios.delete(`${SUPABASE_URL}/functions/v1/users/${userId}`, {
        headers,
      });

      console.log("削除成功");
      return "success";
    } catch (error: any) {
      console.error("従業員削除エラー:", error.response?.data || error);

      // APIサーバーから返答がない場合は通信エラー
      if (!error.response) {
        return "communicationError";
      }

      // 404の場合は削除対象が存在しない
      if (error.response.status === 404) {
        return "notFound";
      }

      // それ以外は処理エラー
      return "processError";
    }
  };

  return {
    deleteEmployee,
  };
}
