//----------------
// 勤怠詳細
// ---------------
// 表示月情報
export interface UserInfo {
  id: number;
  name: string;
  targetMonth: string;
}

// 休憩時間の情報
export interface Break {
  id: number;
  breakStartDt: string;
  breakEndDt: string;
}

// 1日の勤怠記録
export interface AttendanceRecord {
  id: number;
  workDate: string;
  workStartDt: string;
  workEndDt: string | null;
  breaks: Break[];
}

// 勤怠APIのレスポンス
export interface AttendanceApiResponse {
  result: string;
  message: string;
  data: {
    userId: number;
    targetMonth: string;
    attendanceRecords: AttendanceRecord[];
  };
}

// 勤怠の表示タイプ
export type ViewType = 'daily' | 'weekly' | 'monthly';

// 勤怠テーブルの列定義
export interface TableConfig {
  label: string;
  key: string;
}

// 勤怠テーブルの行データ
export interface AttendanceRow {
  [key: string]: string | number; 
}

// 表示タイプごとの列定義
export const TABLE_CONFIGS: Record<ViewType, TableConfig[]> = {
  daily: [
    { label: '日付', key: 'date' },
    { label: '曜日', key: 'day' },
    { label: '勤務開始', key: 'startTime' },
    { label: '勤務終了', key: 'endTime' },
    { label: '休憩時間', key: 'breakTime' },
    { label: '勤務時間', key: 'workingHours' },
  ],
  weekly: [
    { label: '週', key: 'week' },
    { label: '勤務日数', key: 'weeklyWorkingDays' },
    { label: '勤務時間', key: 'weeklyWorkingHours' },
  ],
  monthly: [
    { label: '勤務日数', key: 'totalWorkingDays' },
    { label: '勤務時間', key: 'totalWorkingHours' },
  ]
};