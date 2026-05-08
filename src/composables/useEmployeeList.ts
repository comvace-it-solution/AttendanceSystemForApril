import { ref, onMounted } from "vue";
import axios from "axios";

type Employee = {
  userId: string;
  userName: string;
  birthDate: string;
  assignedDate: string;
  attendanceStatus: string;
};

export function useEmployeeList() {
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const INTERNAL_API_KEY = import.meta.env.VITE_INTERNAL_API_KEY;

  const employees = ref<Employee[]>([]);
  const isFetchError = ref(false);

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": INTERNAL_API_KEY,
  };

  const formatDate = (date: string | null) => {
    if (!date) {
      return "";
    }

    return date.replaceAll("-", "/");
  };

  // 従業員一覧情報を取得する処理
  const fetchEmployees = async () => {
    try {
      isFetchError.value = false;

      const response = await axios.get(`${SUPABASE_URL}/functions/v1/users`, {
        headers,
      });

      console.log("従業員一覧取得成功:", response.data);

      // APIレスポンス形式は response.data.data.users 固定
      const users = response.data.data.users;

      employees.value = users.map((user: any) => {
        return {
          userId: String(user.id).padStart(6, "0"),
          userName: user.userName ?? "",
          birthDate: formatDate(user.birthDate),
          assignedDate: formatDate(user.assignmentDate),
          attendanceStatus: user.currentAttendanceState ?? "",
        };
      });
    } catch (error: any) {
      console.error("従業員一覧取得エラー:", error.response?.data || error);

      isFetchError.value = true;
      employees.value = [];
    }
  };

  onMounted(() => {
    fetchEmployees();
  });

  return {
    employees,
    isFetchError,
    fetchEmployees,
  };
}
