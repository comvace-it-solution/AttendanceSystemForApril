<script setup lang="ts">
import { onMounted } from 'vue'
import { fetchAttendanceUsers } from '../services/attendanceService'
import { useAuthStore } from '../stores/auth'
import { useDashboardStore } from '../stores/dashboard'

const authStore = useAuthStore()
const dashboardStore = useDashboardStore()

const formatTime = (value: string | null) => value ?? '-'

onMounted(async () => {
  dashboardStore.setWorkDate(
    new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    }).format(new Date()),
  )

  dashboardStore.setAttendanceLoading(true)

  try {
    dashboardStore.setAttendanceUsers(await fetchAttendanceUsers())
  } finally {
    dashboardStore.setAttendanceLoading(false)
  }
})
</script>

<template>
  <main class="dashboard-page">
    <div class="dashboard-shell">
      <section class="dashboard-card">
        <header class="dashboard-header">
          <div>
            <p class="dashboard-kicker">Attendance Dashboard</p>
            <h1>{{ dashboardStore.dashboardTitle }}</h1>
            <p class="dashboard-description">
              {{ authStore.userName }}さんの勤務状況と従業員の現在状態を確認できます。
            </p>
          </div>

          <div class="date-chip">{{ dashboardStore.workDate }}</div>
        </header>

        <section class="dashboard-section summary-section" aria-labelledby="summary-title">
          <div class="section-heading">
            <p class="dashboard-kicker">Today</p>
            <h2 id="summary-title">{{ dashboardStore.summaryTitle }}</h2>
          </div>

          <div class="summary-grid">
            <article
              v-for="item in dashboardStore.summaryItems"
              :key="item.label"
              class="summary-item"
              :class="item.className"
            >
              <span>{{ item.label }}</span>
              <div class="summary-value">
                <strong>{{ item.value }}</strong>
                <p v-if="item.note">{{ item.note }}</p>
              </div>
            </article>
          </div>
        </section>

        <section class="dashboard-section punch-section" aria-labelledby="punch-title">
          <div class="section-heading">
            <p class="dashboard-kicker">Punch</p>
            <h2 id="punch-title">{{ dashboardStore.punchTitle }}</h2>
          </div>

          <div class="punch-grid">
            <el-button
              v-for="button in dashboardStore.punchButtons"
              :key="button.label"
              class="punch-button"
              :class="button.className"
              size="large"
            >
              {{ button.label }}
            </el-button>
          </div>
        </section>

        <section class="employee-section" aria-labelledby="employee-title">
          <div class="list-heading">
            <h2 id="employee-title">{{ dashboardStore.attendanceListTitle }}</h2>
          </div>

          <div class="employee-table-wrap">
            <table class="employee-table">
              <thead>
                <tr>
                  <th>名前</th>
                  <th>状態</th>
                  <th>出勤</th>
                  <th>休憩開始</th>
                  <th>休憩終了</th>
                  <th>退勤</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="dashboardStore.isAttendanceLoading">
                  <td colspan="6">読み込み中...</td>
                </tr>
                <tr
                  v-for="user in dashboardStore.attendanceUsers"
                  v-else
                  :key="user.userId"
                >
                  <td>{{ user.userName }}</td>
                  <td>
                    <span class="status-text" :class="dashboardStore.statusClassMap[user.status]">
                      {{ user.status }}
                    </span>
                  </td>
                  <td>{{ formatTime(user.clockInTime) }}</td>
                  <td>{{ formatTime(user.breakStartTime) }}</td>
                  <td>{{ formatTime(user.breakEndTime) }}</td>
                  <td>{{ formatTime(user.clockOutTime) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </div>
  </main>
</template>

<style lang="scss">
.dashboard-page {
  min-height: 100vh;
  color: var(--dashboard-text);
  background: var(--dashboard-page-bg);
}

.dashboard-shell {
  width: min(1280px, 100%);
  min-height: 832px;
  margin: 0 auto;
  padding: 110px 12px 36px;
}

.dashboard-card {
  background: transparent;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 34px;
}

.dashboard-kicker {
  display: none;
}

.dashboard-header h1,
.section-heading h2 {
  margin: 0;
  font-size: 1rem;
  line-height: 1.3;
}

.dashboard-description {
  margin: 5px 0 0;
  color: var(--dashboard-muted);
  font-size: 0.75rem;
  font-weight: 700;
}

.date-chip {
  min-width: 210px;
  padding: 15px 20px;
  border: 1px solid var(--dashboard-line);
  border-radius: 999px;
  background: var(--dashboard-card-bg);
  text-align: center;
  font-weight: 700;
}

.dashboard-section {
  padding: 20px 20px 36px;
  border: 1px solid var(--dashboard-line);
  border-radius: var(--dashboard-radius);
  background: var(--dashboard-panel-bg);
}

.summary-section {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  column-gap: 28px;
  margin-bottom: 20px;
}

.section-heading {
  margin-bottom: 14px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 68px;
  padding-right: 48px;
}

.summary-item {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 66px;
  padding: 10px 18px 8px;
  border: 1px solid var(--dashboard-line);
  border-radius: 18px;
  background: var(--dashboard-card-bg);
  text-align: center;
}

.summary-item span {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  text-align: left;
}

.summary-value {
  align-self: center;
  transform: translateY(-2px);
}

.summary-item strong {
  display: block;
  margin: 0;
  font-size: 1.08rem;
  font-weight: 400;
}

.summary-item p {
  margin: 0;
  font-size: 0.62rem;
  font-weight: 700;
}

.summary-item--worked p {
  padding-right: 18px;
  text-align: right;
}

.punch-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 20px;
  margin: 31px 40px 18px;
}

.punch-section {
  margin-bottom: 20px;
}

.punch-button.el-button {
  width: 100%;
  margin-left: 0;
  min-height: 47px;
  border: 0;
  border-radius: var(--dashboard-radius);
  color: #ffffff;
  font-weight: 700;
}

.punch-button.el-button:hover,
.punch-button.el-button:focus {
  background: #ffffff;
  opacity: 1;
}

.punch-button--pink.el-button {
  background: var(--dashboard-pink);
}

.punch-button--pink.el-button:hover,
.punch-button--pink.el-button:focus {
  border: 1px solid var(--dashboard-pink);
  color: var(--dashboard-pink);
}

.punch-button--navy.el-button {
  background: var(--dashboard-navy);
}

.punch-button--navy.el-button:hover,
.punch-button--navy.el-button:focus {
  border: 1px solid var(--dashboard-navy);
  color: var(--dashboard-navy);
}

.employee-section {
  padding: 20px 20px 32px;
  border: 1px solid var(--dashboard-line);
  border-radius: var(--dashboard-radius);
  background: var(--dashboard-panel-bg);
}

.list-heading {
  margin-bottom: 18px;
}

.list-heading h2 {
  margin: 0;
  font-size: 1rem;
  line-height: 1.3;
}

.employee-table-wrap {
  max-width: 1060px;
  margin: 0 auto;
  overflow-x: auto;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.employee-table th,
.employee-table td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--dashboard-soft-line);
  text-align: center;
  white-space: nowrap;
}

.employee-table th {
  font-size: 0.9rem;
  font-weight: 700;
}

.employee-table td {
  font-size: 0.9rem;
}

.employee-table td:first-child,
.employee-table th:first-child {
  text-align: left;
  font-weight: 700;
}

.status-text {
  font-weight: 700;
}

.status-before {
  color: var(--dashboard-pink);
}

.status-working {
  color: #1729ff;
}

.status-break {
  color: #12a521;
}

.status-done {
  color: #ef8a00;
}

@media (max-width: 768px) {
  .dashboard-page {
    background: var(--dashboard-page-bg);
  }

  .dashboard-shell {
    min-height: 100vh;
    padding: 45px 16px 20px;
  }

  .dashboard-card {
    padding: 11px 13px 16px;
    border: 1px solid var(--dashboard-line);
    border-radius: 3px;
    background: var(--dashboard-panel-bg);
  }

  .dashboard-header {
    flex-direction: column;
    gap: 11px;
    margin-bottom: 12px;
  }

  .dashboard-header h1 {
    font-size: 0.8rem;
  }

  .dashboard-description {
    max-width: 220px;
    font-size: 0.65rem;
    line-height: 1.65;
  }

  .date-chip {
    width: 100%;
    min-width: 0;
    padding: 11px 14px;
    font-size: 0.78rem;
  }

  .dashboard-section {
    padding: 10px 0 12px;
    background: var(--dashboard-panel-bg);
  }

  .summary-section {
    display: block;
    margin: 0 14px 26px;
  }

  .section-heading {
    margin-bottom: 10px;
    text-align: center;
  }

  .section-heading h2 {
    font-size: 0.78rem;
  }

  .summary-grid {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 0 20px;
  }

  .summary-item {
    grid-template-rows: auto 1fr;
    min-height: 40px;
    padding: 7px 9px 8px;
  }

  .summary-item span {
    font-size: 0.6rem;
  }

  .summary-item strong {
    font-size: 0.78rem;
  }

  .summary-item p {
    font-size: 0.55rem;
  }

  .punch-section {
    border: 0;
    padding: 0;
  }

  .punch-grid {
    grid-template-columns: 1fr;
    gap: 10px;
    margin: 16px 15px 24px;
    padding: 15px 9px;
    border: 1px solid var(--dashboard-line);
    border-radius: var(--dashboard-radius);
  }

  .punch-button.el-button {
    min-height: 28px;
    font-size: 0.7rem;
  }

  .employee-section {
    padding: 12px 8px 18px;
  }

  .list-heading {
    text-align: center;
  }

  .list-heading h2 {
    font-size: 0.78rem;
  }

  .employee-table th,
  .employee-table td {
    padding: 7px 10px;
    font-size: 0.7rem;
  }
}
</style>
