<!-- 従業員編集： EmployeeEdit.vue -->
<template>
  <main class="employee-edit-page">
    <h1 class="page-title">従業員編集</h1>
    <form class="edit-form" @submit.prevent="handleUpdate">
      <div class="form-group">
        <label><span class="required">必須</span>ユーザー名</label>
        <input type="text" v-model="form.userName" />
      </div>

      <div class="form-group">
        <label><span class="required">必須</span>メールアドレス</label>
        <input type="email" v-model="form.email" />
      </div>

      <div class="form-group">
        <div class="label-row">
          <label><span class="required">必須</span>電話番号</label>
          <p class="helper-text">※ハイフン(-)は自動で入力されます。</p>
        </div>
        <input type="tel" v-model="form.phoneNumber" />
      </div>

      <div class="form-group">
        <label><span class="required">必須</span>郵便番号</label>
        <div class="postal-row">
          <input class="postal-first" type="text" v-model="postalCodeFirst" />
          <span class="hyphen">ー</span>
          <input class="postal-second" type="text" v-model="postalCodeSecond" />
          <button
            type="button"
            class="search-button"
            @click="onSearchPostalCode"
          >
            郵便番号検索
          </button>
        </div>
      </div>

      <div class="form-group prefecture-group">
        <label><span class="required">必須</span>都道府県</label>
        <select v-model="form.prefecture">
          <option value="">選択してください</option>
          <option v-for="p in prefectures" :key="p" :value="p">
            {{ p }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label><span class="required">必須</span>住所</label>
        <input type="text" v-model="form.streetAddress" />
      </div>

      <div class="form-group">
        <label>建物名</label>
        <input type="text" v-model="form.buildingName" />
      </div>

      <div class="form-group">
        <label><span class="required">必須</span>生年月日</label>
        <div class="date-row">
          <select v-model="form.birthYear">
            <option value="">YYYY</option>
            <option v-for="y in birthYears" :key="y" :value="String(y)">
              {{ y }}
            </option>
          </select>
          <span>年</span>

          <select v-model="form.birthMonth">
            <option value="">MM</option>
            <option
              v-for="m in 12"
              :key="m"
              :value="String(m).padStart(2, '0')"
            >
              {{ String(m).padStart(2, '0') }}
            </option>
          </select>
          <span>月</span>

          <select v-model="form.birthDay">
            <option value="">DD</option>
            <option
              v-for="d in birthDays"
              :key="d"
              :value="String(d).padStart(2, '0')"
            >
              {{ String(d).padStart(2, '0') }}
            </option>
          </select>
          <span>日</span>
        </div>
      </div>

      <div class="form-group">
        <label><span class="required">必須</span>配属日</label>
        <div class="date-row">
          <select v-model="form.assignmentYear">
            <option value="">YYYY</option>
            <option v-for="y in assignYears" :key="y" :value="String(y)">
              {{ y }}
            </option>
          </select>
          <span>年</span>

          <select v-model="form.assignmentMonth">
            <option value="">MM</option>
            <option
              v-for="m in 12"
              :key="m"
              :value="String(m).padStart(2, '0')"
            >
              {{ String(m).padStart(2, '0') }}
            </option>
          </select>
          <span>月</span>

          <select v-model="form.assignmentDay">
            <option value="">DD</option>
            <option
              v-for="d in assignmentDays"
              :key="d"
              :value="String(d).padStart(2, '0')"
            >
              {{ String(d).padStart(2, '0') }}
            </option>
          </select>
          <span>日</span>
        </div>
      </div>

      <div class="password-change-area">
        <p class="password-change-title">
          パスワードを変更する場合チェックしてください
        </p>

        <label class="password-check-button">
          <input type="checkbox" v-model="isPasswordChange" />
          <span>パスワードを変更する</span>
        </label>
      </div>

      <div class="button-area">
        <button type="submit" class="submit-button">上記の内容で変更</button>
        <button type="button" class="cancel-button">キャンセル</button>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useEmployeeEdit } from '../composables/useEmployeeEdit'
import { useAuthStore } from '../stores/auth'
import { useEmployeeDetail } from '../composables/useEmployeeDetail'
import { useRoute } from 'vue-router'
import { useZipCode } from '../composables/useZipCode'

/** 郵便番号検索 composable */
const { searchAddressByPostalCode } = useZipCode()

/** 郵便番号検索 */
const onSearchPostalCode = async () => {
  const postalCode = postalCodeFirst.value + postalCodeSecond.value

  if (postalCode.length !== 7) {
    console.log('郵便番号は7桁で入力してください')
    return
  }

  const address = await searchAddressByPostalCode(postalCode)

  if (!address) {
    console.log('住所が見つかりませんでした')
    return
  }

  form.prefecture = address.prefecture
  form.streetAddress = `${address.city}${address.town}`
}
const route = useRoute()

/** 認証ストア */
const authStore = useAuthStore()

/** 従業員詳細 composable */
const { employeeDetail, fetchEmployeeDetail } = useEmployeeDetail()

/** 編集フォーム */
const form = reactive({
  /** ユーザー名 */
  userName: '',

  /** メールアドレス */
  email: '',

  /** 電話番号 */
  phoneNumber: '',

  /** 都道府県 */
  prefecture: '',

  /** 住所 */
  streetAddress: '',

  /** 建物名 */
  buildingName: '',

  /** 生年月日（年） */
  birthYear: '',

  /** 生年月日（月） */
  birthMonth: '',

  /** 生年月日（日） */
  birthDay: '',

  /** 配属日（年） */
  assignmentYear: '',

  /** 配属日（月） */
  assignmentMonth: '',

  /** 配属日（日） */
  assignmentDay: '',

  /** パスワードj */
  password: '',
})

/** 郵便番号（前半3桁） */
const postalCodeFirst = ref('')

/** 郵便番号（後半4桁） */
const postalCodeSecond = ref('')

/** パスワード変更チェック */
const isPasswordChange = ref(false)

/** 現在年 */
const currentYear = new Date().getFullYear()

/** 生年月日 年プルダウン
 * 現在年から過去100年
 */
const birthYears = Array.from({ length: 100 }, (_, i) => currentYear - i)

/**
 * 生年月日 日数制御
 * 月・年によって日数変更
 */
const birthDays = computed(() => {
  if (!form.birthYear || !form.birthMonth) {
    return 31
  }

  return new Date(Number(form.birthYear), Number(form.birthMonth), 0).getDate()
})

/**
 * 生年月日の年月変更時
 * 日をリセット
 */
watch(
  () => [form.birthYear, form.birthMonth],
  () => {
    form.birthDay = ''
  },
)

/**
 * 配属日 年プルダウン
 * 過去100年〜未来10年
 */
const assignYears = Array.from({ length: 111 }, (_, i) => currentYear + 10 - i)

/** 配属日 日数制御 */
const assignmentDays = computed(() => {
  if (!form.assignmentYear || !form.assignmentMonth) {
    return 31
  }

  return new Date(
    Number(form.assignmentYear),
    Number(form.assignmentMonth),
    0,
  ).getDate()
})

/**
 * 配属日の年月変更時
 * 日をリセット
 */
watch(
  () => [form.assignmentYear, form.assignmentMonth],
  () => {
    form.assignmentDay = ''
  },
)

/** 都道府県一覧 */
const prefectures = [
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県',
]

/**
 * 日付文字列分割
 * 例：
 * 2026-04-15
 * ↓
 * year month day
 */
const splitDate = (date: string) => {
  const [year, month, day] = date.split('-')

  return {
    year,
    month,
    day,
  }
}

/**
 * 電話番号表示整形
 * 09012345678
 * ↓
 * 090-1234-5678
 */
const formatPhone = (phoneNumber: string) => {
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
}

/**
 * 郵便番号分割
 * 1140033
 * ↓
 * 114 / 0033
 */
const splitPostalCode = (postalCode: string) => {
  return {
    first: postalCode.slice(0, 3),
    second: postalCode.slice(3, 7),
  }
}

/**
 * 初期表示
 * 従業員詳細取得
 */
onMounted(async () => {
  /** ログインユーザーID */
  const userId = Number(authStore.user?.userId)

  /** API実行 */
  await fetchEmployeeDetail(userId)

  /** データなし */
  if (!employeeDetail.value) {
    return
  }

  /** 生年月日分割 */
  const birthDate = splitDate(employeeDetail.value.birthDate)

  /** 配属日分割 */
  const assignmentDate = splitDate(employeeDetail.value.assignmentDate)

  /** 郵便番号分割 */
  const postalCode = splitPostalCode(employeeDetail.value.postalCode)

  /** フォームへ設定 */
  form.userName = employeeDetail.value.userName

  form.email = employeeDetail.value.email

  form.phoneNumber = formatPhone(employeeDetail.value.phoneNumber)

  postalCodeFirst.value = postalCode.first

  postalCodeSecond.value = postalCode.second

  form.prefecture = employeeDetail.value.prefecture

  form.streetAddress = employeeDetail.value.streetAddress

  form.buildingName = employeeDetail.value.buildingName

  form.birthYear = birthDate.year

  form.birthMonth = birthDate.month

  form.birthDay = birthDate.day

  form.assignmentYear = assignmentDate.year

  form.assignmentMonth = assignmentDate.month

  form.assignmentDay = assignmentDate.day

  console.log('route.params', route.params)
  console.log('route.params.id', route.params.id)
  console.log('authStore.user', authStore.user)
})

/** 従業員編集 composable */
const { editError, updateEmployee } = useEmployeeEdit()

/** 更新処理 */
const handleUpdate = async () => {
  /** ログインユーザーID */
  const userId = Number(route.params.id)

  /** API送信用データ */
  const requestBody = {
    userName: form.userName,

    /** パスワード変更時のみ送信 */
    password: isPasswordChange.value ? form.password : undefined,

    email: form.email,

    /** ハイフン除去 */
    phoneNumber: form.phoneNumber.replace(/-/g, ''),

    /** 郵便番号結合 */
    postalCode: postalCodeFirst.value + postalCodeSecond.value,

    prefecture: form.prefecture,

    streetAddress: form.streetAddress,

    buildingName: form.buildingName,

    /** YYYY-MM-DD形式へ変換 */
    birthDate: `${form.birthYear}-${form.birthMonth}-${form.birthDay}`,

    assignmentDate: `${form.assignmentYear}-${form.assignmentMonth}-${form.assignmentDay}`,
  }

  /** API実行 */
  await updateEmployee(userId, requestBody, isPasswordChange.value)
}
</script>

<style scoped>
.employee-edit-page {
  width: 100%;
  min-height: 100vh;
  padding: 40px 0 60px;
  background: #fff;
  color: #333;
}

.page-title {
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 40px;
}

.edit-form {
  width: 560px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 28px;
}

label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  color: #666;
  margin-bottom: 8px;
}

.required {
  background: #de2583;
  color: #fff;
  font-size: 10px;
  padding: 2px 6px;
}

input,
select {
  width: 100%;
  height: 45px;
  border: 1px solid #bbb;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 700;
  box-sizing: border-box;
  background: #fff;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.helper-text {
  font-size: 10px;
  font-weight: 700;
  margin: 0 8px 8px 0;
}

.postal-row,
.date-row {
  display: flex;
  align-items: center;
  gap: 18px;
}

.postal-first {
  width: 90px;
}

.postal-second {
  width: 140px;
}

.hyphen {
  color: #777;
}

.search-button {
  width: 180px;
  height: 45px;
  margin-left: auto;
  border: none;
  background: #de2583;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}

.prefecture-group select {
  width: 170px;
}

.date-row select {
  width: 140px;
}

.date-row span {
  font-size: 12px;
}

.password-change-area {
  margin-top: 50px;
}

.password-change-title {
  border-left: 6px solid #de2583;
  padding-left: 10px;
  font-size: 15px;
  font-weight: 700;
}

.password-check-button {
  width: 155px;
  height: 40px;
  margin-top: 25px;
  border: 1px solid #ddd;
  background: #f8f8f8;
  color: #777;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 11px;
}

.password-check-button input {
  width: auto;
  height: auto;
}

.button-area {
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
}

.submit-button,
.cancel-button {
  width: 240px;
  height: 50px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

.submit-button {
  background: #de2583;
  color: #fff;
  border: 1px solid #de2583;
}

.cancel-button {
  background: #fff;
  color: #de2583;
  border: 2px solid #de2583;
}
/* SP対応（max-width: 480px） */
@media (max-width: 480px) {
  /* 全体 */
  .employee-register-page,
  .employee-edit-page,
  .employee-detail-page {
    padding: 20px 12px 40px;
  }

  /* タイトル */
  .page-title {
    font-size: 16px;
    margin-bottom: 24px;
  }

  /* フォーム・リスト幅を100%に */
  .register-form,
  .edit-form,
  .detail-list {
    width: 100%;
  }

  /* 入力系 */
  input,
  select {
    height: 38px;
    font-size: 12px;
  }

  /* ラベル */
  label {
    font-size: 11px;
  }

  /* 必須タグ */
  .required {
    font-size: 9px;
    padding: 2px 4px;
  }

  /* 郵便番号横並び */
  .postal-row {
    gap: 8px;
  }

  .postal-first {
    width: 60px;
  }

  .postal-second {
    width: 90px;
  }

  .search-button {
    width: 120px;
    height: 38px;
    font-size: 11px;
  }

  /* 日付 */
  .date-row {
    gap: 6px;
  }

  .date-row select {
    width: 80px;
  }

  /* 詳細画面 */
  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;
  }

  .detail-label {
    width: auto;
    font-size: 12px;
    margin-bottom: 4px;
  }

  .detail-value {
    font-size: 13px;
  }

  /* ボタン */
  .submit-button,
  .cancel-button,
  .edit-button {
    width: 100%;
    height: 44px;
    font-size: 14px;
  }

  .button-area {
    gap: 20px;
    margin-top: 40px;
  }

  /* パスワード変更エリア */
  .password-change-title {
    font-size: 13px;
  }

  .password-check-button {
    width: 100%;
    height: 36px;
  }
}
</style>
