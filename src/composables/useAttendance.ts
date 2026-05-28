import {ref, computed } from 'vue';
import { type ViewType, type AttendanceRow, TABLE_CONFIGS } from '../types/types.ts';
// import axios from 'axios'

export function useAttendance() {
  const currentView = ref<ViewType>('daily');

  // const dailyData = ref<AttendanceRow[]>([]);
  // const weeklyData = ref<AttendanceRow[]>([]);
  // const monthlyData = ref<AttendanceRow[]>([]);

  // 仮データ
  const dailyData = ref<AttendanceRow[]>([
    { date: '2026/04/01', day: '水', startTime: '09:00', endTime: '18:00', breakTime: '01:00', workingHours: '08:00' },
  ]);
  const weeklyData = ref<AttendanceRow[]>([
    { week: '第1週', weeklyWorkingDays: '3日', weeklyWorkingHours: '24:00' },
  ]);
  const monthlyData = ref<AttendanceRow[]>([
    { totalWorkingDays: '20日', totalWorkingHours: '160:00' },
  ]);

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
    currentView,
    setView,
    currentConfig,
    currentTableData,
  };
}