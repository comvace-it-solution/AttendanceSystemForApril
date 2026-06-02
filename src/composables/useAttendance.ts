import {ref, computed, onMounted, watch } from 'vue';
import { type AttendanceApiResponse, type ViewType, type AttendanceRow, TABLE_CONFIGS, type AttendanceRecord } from '../types/types.ts';
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const INTERNAL_API_KEY = import.meta.env.VITE_INTERNAL_API_KEY

const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': INTERNAL_API_KEY,
  }
})

export function useAttendance(props: { id: number, initialName: string }) {
  const isLoading = ref(true);
  const error = ref<string | null>(null);
  const currentView = ref<ViewType>('daily');
  const userId = ref(props.id);
  const userName = ref(props.initialName || '不明なユーザー');
  const rawRecords = ref<AttendanceRecord[]>([]); 
  const targetMonth = ref(getTodayMonth());

  // 現在の年月を取得
  function getTodayMonth() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }

  // ミリ秒を "HH:mm" 形式に変換
  const msToTimeStr = (ms: number): string => {
    if (ms <= 0) return '00:00';
    const totalMinutes = Math.floor(ms / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  // 時刻文字列 (HH:mm) の取得
  const formatTime = (dtStr: string | null) => dtStr ? dtStr.substring(11, 16) : '-';

  // データ取得
  const fetchAttendance = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await apiClient.get<AttendanceApiResponse>(`${API_BASE_URL}/attendance/records?userId=${userId.value}&targetMonth=${targetMonth.value}`);
      
      if (response.data.result === 'success') {
        rawRecords.value = response.data.data.attendanceRecords;
      }
    } catch (err) {
      console.error('通信エラー:', err);
      error.value = '勤怠一覧の取得に失敗しました。';
    }finally {
      setTimeout(() => {
        isLoading.value = false;
      }, 300);
    }


  };

  // 対象月の変更
  const changeMonth = (offset: number) => {
    const [year, month] = targetMonth.value.split('-').map(Number);
    const date = new Date(year, month - 1 + offset);
    const newYear = date.getFullYear();
    const newMonth = String(date.getMonth() + 1).padStart(2, '0');
    targetMonth.value = `${newYear}-${newMonth}`;
  };

  // 対象月の変更でデータを再取得
  watch(targetMonth, fetchAttendance);
  onMounted(fetchAttendance);

  // 日次
  const dailyData = computed<AttendanceRow[]>(() => {
    if (isLoading.value || rawRecords.value.length === 0) {
      return [];
    }
    // 対象月の全日付リストを作成
    const [year, month] = targetMonth.value.split('-').map(Number);
    const lastDay = new Date(year, month, 0).getDate();
    const daysInMonth = Array.from({ length: lastDay }, (_, i) => {
      const dayNum = i + 1;
      return `${year}-${String(month).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    });

    // ループして日付ごとに勤務データをマッピング
    return daysInMonth.map(dateStr => {
      const record = rawRecords.value.find(r => r.workDate === dateStr);

      // 勤務がある日
      if (record) {
        // 休憩時間
        let totalBreakMs = 0;
        record.breaks.forEach(b => {
          totalBreakMs += (new Date(b.breakEndDt).getTime() - new Date(b.breakStartDt).getTime());
        });
        
        // 勤務時間
        let workingHoursStr = '00:00';
        if (record.workStartDt && record.workEndDt) {
          const diffMs = new Date(record.workEndDt).getTime() - new Date(record.workStartDt).getTime() - totalBreakMs;
          workingHoursStr = msToTimeStr(diffMs);
        }

        return {
          date: dateStr.replace(/-/g, '/'),
          day: new Date(dateStr).toLocaleDateString('ja-JP', { weekday: 'short' }),
          startTime: formatTime(record.workStartDt),
          endTime: formatTime(record.workEndDt),
          breakTime: msToTimeStr(totalBreakMs),
          workingHours: workingHoursStr
        };
      } else {
        // 勤務がない日
        return {
          date: dateStr.replace(/-/g, '/'),
          day: new Date(dateStr).toLocaleDateString('ja-JP', { weekday: 'short' }),
          startTime: '0:00',
          endTime: '0:00',
          breakTime: '0:00',
          workingHours: '0:00'
        };
      }
    });
  });

  // 週次
  const weeklyData = computed<AttendanceRow[]>(() => {
    if (isLoading.value || dailyData.value.length === 0) {
      return [];
    }

    const weeklyGroups: Record<string, { count: number; minutes: number; }> = {};
    const currentMonthStr = targetMonth.value.replace(/-/g, '/');
    dailyData.value.forEach((day) => {
      //  対象月以外の日付はスキップ
      if (typeof day.date === 'string' && !day.date.includes(currentMonthStr)) {
        return;
      }
      // 日付からその週の月曜日を計算
      const date = new Date(day.date as string);
      const dayOfWeek = date.getDay(); 
      const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const monday = new Date(date);
      monday.setDate(date.getDate() - diffToMonday);

      const weekKey = monday.toLocaleDateString('ja-JP');
      // 週の集計オブジェクトがなければ初期化
      if (!weeklyGroups[weekKey]) {
        weeklyGroups[weekKey] = { 
          count: 0, 
          minutes: 0, 
        };
      }

      // 勤務日数（労働時間が0:00より大きい日をカウント）
      if (
        day.workingHours && 
        day.workingHours !== '0:00'
      ) {
        weeklyGroups[weekKey].count++;
      }

      // 勤務時間
      const wHours = day.workingHours;
      if (typeof wHours === 'string' && wHours.includes(':')) {
        const [h, m] = wHours.split(':').map(Number);
        if (!isNaN(h) && !isNaN(m)) {
          weeklyGroups[weekKey].minutes += (h * 60 + m);
        }
      }
    });
    return Object.keys(weeklyGroups).sort((a, b) => new Date(a).getTime() - new Date(b).getTime()).map((key, index) => {
      const week = weeklyGroups[key];
      const h = Math.floor(week.minutes / 60);
      const m = week.minutes % 60;
      const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

      return {
        week: `第${index + 1}週`,
        weeklyWorkingDays: `${week.count}`,
        weeklyWorkingHours: timeStr
      };
    });
});

  // 月次
  const monthlyData = computed<AttendanceRow[]>(() => {
    if (isLoading.value || rawRecords.value.length === 0) {
      return [];
    }

    // 勤務日数
    const totalWorkingDays = dailyData.value.filter(day => 
      day.workingHours && 
      day.workingHours !== '0:00'
    ).length;

    // 総勤務時間
    const totalMinutes = dailyData.value.reduce((acc, day) => {
      const wHours = day.workingHours;
      if (typeof wHours !== 'string' || wHours === '-' || !wHours.includes(':')) {
        return acc;
      }
      const [hours, mins] = wHours.split(':').map(Number);
      return acc + (hours * 60 + mins);
    }, 0);

    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMins = totalMinutes % 60;
    const totalWorkingHoursStr = `${String(totalHours).padStart(2, '0')}:${String(remainingMins).padStart(2, '0')}`;

    return [
      {
        totalWorkingDays: `${totalWorkingDays}`,
        totalWorkingHours: totalWorkingHoursStr
      }
    ];
  });

  // 表示の切替
  const setView = (view: ViewType) => {
    currentView.value = view;
  };
  const currentConfig = computed(() => TABLE_CONFIGS[currentView.value]);
  const currentTableData = computed(() => {
    switch (currentView.value) {
      case 'daily': return dailyData.value;
      case 'weekly': return weeklyData.value;
      case 'monthly': return monthlyData.value;
    }
  });

  return {
    userId,
    userName,
    targetMonth,
    currentView,
    setView,
    currentConfig,
    currentTableData,
    changeMonth,
    isLoading,
    error
  };
}