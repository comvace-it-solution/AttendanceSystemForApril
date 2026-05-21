<!-- 従業員詳細： EmployeeDetail.vue -->
<template>
  <main class="employee-detail-page">
    <h1 class="page-title">従業員詳細</h1>
    <div class="detail-list">
      <div v-for="item in detailItems" :key="item.label" class="detail-item">
        <div class="detail-label">
          {{ item.label }}
        </div>

        <div class="detail-value">
          {{ item.value }}
        </div>
      </div>
    </div>
    <div class="button-area">
      <router-link
        :to="{ name: 'EmployeeEdit', params: { id: authStore.user?.userId } }"
        class="edit-button"
        >編集する
      </router-link>
    </div>
  </main>
</template>

<script setup lang="ts">
/** ========================
 * Import
 * ===================== */
import { computed, onMounted } from 'vue'
import { useEmployeeDetail } from '../composables/useEmployeeDetail'
import { useAuthStore } from '../stores/auth'

/** ========================
 * Store
 * ===================== */
const authStore = useAuthStore()

/** ========================
 * Composables
 * ===================== */
const { employeeDetail, fetchEmployeeDetail } = useEmployeeDetail()

/** ========================
 * Computed
 * ===================== */
/** ログインユーザーID */
const userId = computed(() => {
  return Number(authStore.user?.userId)
})

/** 住所を結合して表示用 */
const fullAddress = computed(() => {
  if (!employeeDetail.value) return ''
  return [
    employeeDetail.value.prefecture,
    employeeDetail.value.streetAddress,
    employeeDetail.value.buildingName,
  ]
    .filter(Boolean)
    .join('')
})

/** 詳細テーブルリスト */
const detailItems = computed(() => [
  {
    label: 'ユーザー名：',
    value: employeeDetail.value?.userName,
  },

  {
    label: 'メールアドレス：',
    value: employeeDetail.value?.email,
  },

  {
    label: 'パスワード：',
    value: '＊＊＊＊＊＊',
  },

  {
    label: '生年月日：',
    value: formatDate(employeeDetail.value?.birthDate),
  },

  {
    label: '電話番号：',
    value: formatPhone(employeeDetail.value?.phoneNumber),
  },

  {
    label: '郵便番号：',
    value: formatPostalCode(employeeDetail.value?.postalCode),
  },

  {
    label: '住所：',
    value: fullAddress.value,
  },

  {
    label: '配属日：',
    value: formatDate(employeeDetail.value?.assignmentDate),
  },
])

/** ========================
 * Formatters
 * ===================== */
/**
 * 日付表示フォーマット
 * 2026-04-15 → 2026/04/15
 */
const formatDate = (date?: string) => {
  if (!date) return ''

  return date.replaceAll('-', '/')
}
/**
 * 電話番号表示フォーマット
 * 09012345678 → 090-1234-5678
 */
const formatPhone = (phoneNumber?: string) => {
  if (!phoneNumber) return ''

  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
}
/**
 * 郵便番号表示フォーマット
 * 1140033 → 114-0033
 */
const formatPostalCode = (postalCode?: string) => {
  if (!postalCode) return ''

  return postalCode.replace(/(\d{3})(\d{4})/, '$1-$2')
}

/** ========================
 * Lifecycle
 * ===================== */
/** 初期表示時 */
onMounted(async () => {
  await fetchEmployeeDetail(userId.value)
})
</script>

<style scoped>
.employee-detail-page {
  width: 100%;
  min-height: 100vh;
  padding: 48px 0 60px;
  background: #fff;
  color: #333;
}
.page-title {
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 55px;
}
.detail-list {
  width: 620px;
  margin: 0 auto;
}
.detail-item {
  min-height: 58px;
  border: 2px solid #de2583;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 0 22px;
  margin-bottom: 30px;
  box-sizing: border-box;
}
.detail-label {
  width: 140px;
  font-size: 16px;
  font-weight: 700;
  color: #000;
}
.detail-value {
  flex: 1;
  font-size: 16px;
  font-weight: 700;
  color: #666;
  word-break: break-word;
}
.button-area {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}
.edit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 260px;
  height: 56px;
  background: #de2583;
  color: #fff;
  border: 1px solid #de2583;
  border-radius: 2px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
}

/* SP対応（max-width: 480px） */
@media (max-width: 480px) {
  .employee-detail-page {
    padding: 20px 12px 40px;
  }
  .page-title {
    font-size: 16px;
    margin-bottom: 24px;
  }
  .detail-list {
    width: 100%;
  }
  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;
    margin-bottom: 20px;
  }
  .detail-label {
    width: auto;
    font-size: 12px;
    margin-bottom: 4px;
  }
  .detail-value {
    font-size: 13px;
  }
  .button-area {
    margin-top: 40px;
  }
  .edit-button {
    width: 100%;
    height: 44px;
    font-size: 14px;
  }
}
</style>
