//----------------
// 勤怠詳細
// ---------------
export type ViewType = 'daily' | 'weekly' | 'monthly';

export interface TableConfig {
  label: string;
  key: string;
}

export interface AttendanceRow {
  [key: string]: string | number; 
}

// 各Viewごとの列定義
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