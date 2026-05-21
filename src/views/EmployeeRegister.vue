<!-- 従業員登録： EmployeeRegister.vue -->
<template>
  <main class="employee-register-page">
    <h1 class="page-title">従業員登録</h1>

    <!-- 登録フォーム -->
    <form class="register-form" @submit.prevent="handleRegister">
      <!-- ユーザー名 -->
      <div class="form-group">
        <label>
          <span class="required">必須</span>
          ユーザー名
        </label>
        <input v-model="form.userName" type="text" placeholder="例: 山田花子" />
      </div>

      <!-- メールアドレス -->
      <div class="form-group">
        <label>
          <span class="required">必須</span>
          メールアドレス
        </label>

        <input
          v-model="form.email"
          type="email"
          placeholder="例: contact@example.com"
        />
      </div>

      <!-- パスワード -->
      <div class="form-group">
        <label>
          <span class="required">必須</span>
          パスワード
        </label>

        <div class="input-icon-wrap">
          <input
            :type="isPasswordVisible ? 'text' : 'password'"
            v-model="form.password"
            placeholder="半角英数混合6文字"
          />

          <!-- パスワード表示切替 -->
          <img
            class="eye-icon"
            :src="
              isPasswordVisible ? '/passwordOpen.svg' : '/passwordClose.svg'
            "
            alt="パスワード表示切替アイコン"
            @click="isPasswordVisible = !isPasswordVisible"
          />
        </div>
      </div>

      <!-- パスワード確認 -->
      <div class="form-group">
        <label>
          <span class="required">必須</span>
          パスワード（確認用）
        </label>

        <div class="input-icon-wrap">
          <input
            :type="isSecondPasswordVisible ? 'text' : 'password'"
            v-model="secondPassword"
            placeholder="半角英数混合6文字"
          />

          <!-- パスワード表示切替 -->
          <img
            class="eye-icon"
            :src="
              isSecondPasswordVisible
                ? '/passwordOpen.svg'
                : '/passwordClose.svg'
            "
            alt="パスワード表示切替アイコン"
            @click="isSecondPasswordVisible = !isSecondPasswordVisible"
          />
        </div>
      </div>

      <!-- 電話番号 -->
      <div class="form-group">
        <div class="label-row">
          <label>
            <span class="required">必須</span>
            電話番号
          </label>

          <p class="helper-text">※ハイフン(-)は自動で入力されます。</p>
        </div>

        <input
          type="tel"
          v-model="form.phoneNumber"
          @input="formatPhone"
          placeholder="例:090-0000-0000"
        />
      </div>

      <!-- 郵便番号 -->
      <div class="form-group">
        <label>
          <span class="required">必須</span>
          郵便番号
        </label>

        <div class="postal-row sp-postal-row">
          <div class="postal-row">
            <!-- 郵便番号前半 -->
            <input
              class="postal-first"
              v-model="postalCodeFirst"
              type="text"
              placeholder="000"
            />

            <span class="hyphen">-</span>

            <!-- 郵便番号後半 -->
            <input
              class="postal-second"
              v-model="postalCodeSecond"
              type="text"
              placeholder="0000"
            />
          </div>

          <!-- 郵便番号検索 -->
          <button
            type="button"
            class="search-button"
            @click="onSearchPostalCode"
          >
            郵便番号検索
          </button>
        </div>
      </div>

      <!-- 都道府県 -->
      <div class="form-group prefecture-group">
        <label>
          <span class="required">必須</span>
          都道府県
        </label>

        <div class="date-row">
          <select
            v-model="form.prefecture"
            :class="{ selected: form.prefecture }"
            class="date-select prefecture-dropdown"
          >
            <option value="">選択してください</option>

            <option v-for="p in prefectures" :key="p" :value="p">
              {{ p }}
            </option>
          </select>
        </div>
      </div>

      <!-- 住所 -->
      <div class="form-group">
        <label>
          <span class="required">必須</span>
          住所
        </label>

        <input
          v-model="form.streetAddress"
          type="text"
          placeholder="例: ○○区○○"
        />
      </div>

      <!-- 建物名 -->
      <div class="form-group">
        <label>建物名</label>

        <input
          v-model="form.buildingName"
          type="text"
          placeholder="例: ○○タウン 101"
        />
      </div>

      <!-- 生年月日 -->
      <div class="form-group">
        <label>
          <span class="required">必須</span>
          生年月日
        </label>

        <div class="date-row">
          <!-- 年 -->
          <select
            v-model="birthYear"
            :class="{ selected: birthYear }"
            class="date-select year-date"
          >
            <option value="">YYYY</option>

            <option v-for="y in birthYears" :key="y" :value="y">
              {{ y }}
            </option>
          </select>

          <span>年</span>

          <!-- 月 -->
          <select
            v-model="birthMonth"
            :class="{ selected: birthMonth }"
            class="date-select month-date"
          >
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

          <!-- 日 -->
          <select
            v-model="birthDay"
            :class="{ selected: birthDay }"
            class="date-select day-date"
          >
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

      <!-- 配属日 -->
      <div class="form-group">
        <label>
          <span class="required">必須</span>
          配属日
        </label>

        <div class="date-row">
          <!-- 年 -->
          <select
            v-model="assignYear"
            :class="{ selected: assignYear }"
            class="date-select year-date"
          >
            <option value="">YYYY</option>

            <option v-for="y in assignYears" :key="y" :value="y">
              {{ y }}
            </option>
          </select>

          <span>年</span>

          <!-- 月 -->
          <select
            v-model="assignMonth"
            :class="{ selected: assignMonth }"
            class="date-select month-date"
          >
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

          <!-- 日 -->
          <select
            v-model="assignDay"
            :class="{ selected: assignDay }"
            class="date-select day-date"
          >
            <option value="">DD</option>

            <option
              v-for="d in assignDays"
              :key="d"
              :value="String(d).padStart(2, '0')"
            >
              {{ String(d).padStart(2, '0') }}
            </option>
          </select>

          <span>日</span>
        </div>
      </div>

      <!-- ボタン -->
      <div class="button-area">
        <!-- 登録 -->
        <button type="submit" class="submit-button">上記の内容で登録</button>
        <!-- キャンセル -->
        <button type="button" class="cancel-button">キャンセル</button>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useEmployeeRegister } from '../composables/useEmployeeRegister'
import { useZipCode } from '../composables/useZipCode'

const { searchAddressByPostalCode } = useZipCode()

/**
 * 郵便番号検索
 */
const onSearchPostalCode = async () => {
  /**
   * 郵便番号結合
   */
  const postalCode = postalCodeFirst.value + postalCodeSecond.value

  /**
   * 7桁チェック
   */
  if (postalCode.length !== 7) {
    return
  }

  /**
   * API実行
   */
  const address = await searchAddressByPostalCode(postalCode)

  /**
   * データなし
   */
  if (!address) {
    return
  }

  /**
   * 住所反映
   */
  form.prefecture = address.prefecture

  form.streetAddress = `${address.city}${address.town}`
}

/**
 * composableから取得
 * form：APIへ送る値
 * onRegister：登録API実行
 */
const { form, onRegister } = useEmployeeRegister()

/**
 * パスワード表示切替フラグ
 */
const isPasswordVisible = ref(false)

/**
 * 確認用パスワード表示切替フラグ
 */
const isSecondPasswordVisible = ref(false)

/**
 * 確認用パスワード
 * ※ APIには送らない
 */
const secondPassword = ref('')

/**
 * 郵便番号前半3桁
 */
const postalCodeFirst = ref('')

/**
 * 郵便番号後半4桁
 */
const postalCodeSecond = ref('')

/**
 * 現在年
 */
const currentYear = new Date().getFullYear()

/* =====================================================
  生年月日
===================================================== */

/**
 * 生年月日 年
 */
const birthYear = ref('')

/**
 * 生年月日 月
 */
const birthMonth = ref('')

/**
 * 生年月日 日
 */
const birthDay = ref('')

/**
 * 生年月日 年一覧
 * 今年〜100年前
 */
const birthYears = Array.from({ length: 100 }, (_, i) => currentYear - i)

/**
 * 生年月日の日数を月ごとに変更
 */
const birthDays = computed(() => {
  if (!birthYear.value || !birthMonth.value) return 31

  return new Date(
    Number(birthYear.value),
    Number(birthMonth.value),
    0,
  ).getDate()
})

/**
 * 年・月変更時に日をリセット
 */
watch([birthYear, birthMonth], () => {
  birthDay.value = ''
})

/* =====================================================
  配属日
===================================================== */

/**
 * 配属日 年
 */
const assignYear = ref('')

/**
 * 配属日 月
 */
const assignMonth = ref('')

/**
 * 配属日 日
 */
const assignDay = ref('')

/**
 * 配属日 年一覧
 * 過去100年〜未来10年
 */
const assignYears = Array.from({ length: 111 }, (_, i) => currentYear + 10 - i)

/**
 * 配属日の日数を月ごとに変更
 */
const assignDays = computed(() => {
  if (!assignYear.value || !assignMonth.value) return 31

  return new Date(
    Number(assignYear.value),
    Number(assignMonth.value),
    0,
  ).getDate()
})

/**
 * 年・月変更時に日をリセット
 */
watch([assignYear, assignMonth], () => {
  assignDay.value = ''
})

/* =====================================================
  電話番号
===================================================== */

/**
 * 電話番号フォーマット
 * ・全角→半角変換
 * ・ハイフン自動付与
 */
const formatPhone = () => {
  let value = form.phoneNumber

  /**
   * 全角数字を半角へ変換
   */
  value = value.replace(/[０-９]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0),
  )

  /**
   * 数字以外除去
   */
  value = value.replace(/\D/g, '')

  /**
   * ハイフン付与
   */
  if (value.length > 3 && value.length <= 7) {
    value = value.replace(/(\d{3})(\d+)/, '$1-$2')
  } else if (value.length > 7) {
    value = value.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3')
  }

  form.phoneNumber = value
}

/* =====================================================
  都道府県
===================================================== */

/**
 * 都道府県一覧
 */
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

/* =====================================================
  登録処理
===================================================== */

/**
 * 登録ボタン押下時
 */
const handleRegister = async () => {
  /**
   * 郵便番号結合
   * 例：114 + 0033 → 1140033
   */
  form.postalCode = postalCodeFirst.value + postalCodeSecond.value

  /**
   * 電話番号のハイフン除去
   */
  form.phoneNumber = form.phoneNumber.replace(/-/g, '')

  /**
   * 生年月日整形
   * YYYY-MM-DD
   */
  form.birthDate =
    birthYear.value && birthMonth.value && birthDay.value
      ? `${birthYear.value}-${birthMonth.value}-${birthDay.value}`
      : ''

  /**
   * 配属日整形
   * YYYY-MM-DD
   */
  form.assignmentDate =
    assignYear.value && assignMonth.value && assignDay.value
      ? `${assignYear.value}-${assignMonth.value}-${assignDay.value}`
      : ''

  console.log('登録API送信内容', {
    userName: form.userName,
    password: form.password,
    email: form.email,
    phoneNumber: form.phoneNumber,
    postalCode: form.postalCode,
    prefecture: form.prefecture,
    streetAddress: form.streetAddress,
    buildingName: form.buildingName,
    birthDate: form.birthDate,
    assignmentDate: form.assignmentDate,
  })
  /**
   * API実行
   */
  await onRegister()
}
</script>

<style scoped>
.employee-register-page {
  width: 100%;
  min-height: 100vh;
  padding: 40px 0 60px;
  background: #fff;
  color: #333;
}

.page-title {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 40px;
}

.register-form {
  width: 520px;
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
  margin-bottom: 8px;
}

.required {
  display: inline-block;
  background: #de2583;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
}

input {
  width: 100%;
  height: 40px;
  border: 2px solid #bbb;
  border-radius: 0px;
  padding: 0 12px;
  font-size: 12px;
  box-sizing: border-box;
  color: #333;
  background: #fff;
}

input:focus {
  outline: none;
  border-color: #de2583;
}

input::placeholder {
  color: #cfcfcf;
  font-weight: 700;
}

.date-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.date-select {
  height: 40px;
  border: 2px solid #bbb;
  border-radius: 0px;
  padding: 0 30px 0 12px;
  font-size: 12px;
  color: #aaa;
  background-color: #fff;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='%23999' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M5 7l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 6px center;
  background-size: 15px;
}

.date-select:focus {
  outline: none;
  border-color: #de2583;
}

.date-select.selected {
  color: #000;
}

.year-date,
.prefecture-dropdown {
  width: 160px;
}

.month-date,
.day-date {
  width: 100px;
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

.input-icon-wrap {
  position: relative;
}

.input-icon-wrap input {
  padding-right: 42px;
}

.eye-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  width: 18px;
  height: 18px;
}

.postal-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.postal-first {
  width: 100px;
}

.postal-second {
  width: 150px;
}

.hyphen {
  color: #777;
}

.search-button {
  width: 200px;
  height: 40px;
  margin-left: auto;
  background: #de2583;
  color: #fff;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.prefecture-group select {
  width: 150px;
}

.date-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.date-row span {
  font-size: 12px;
}

.button-area {
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.submit-button,
.cancel-button {
  width: 210px;
  height: 44px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 3px;
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
  .employee-register-page {
    padding: 40px 10% 40px;
  }

  .page-title {
    font-size: 14px;
    margin-bottom: 24px;
  }

  .register-form {
    width: 100%;
  }

  .form-group {
    margin-bottom: 24px;
  }

  label {
    margin-bottom: 2px;
    font-size: 10px;
    gap: 4px;
  }

  .helper-text {
    font-size: 8px;
    margin: 0;
  }

  .required {
    font-size: 8px;
    padding: 1px 5px;
  }

  input,
  select {
    height: 36px;
    font-size: 10px;
  }

  /* 郵便番号 */
  .postal-row {
    gap: 8px;
    width: 100%;
  }

  .sp-postal-row {
    display: flex;
    flex-direction: column;
  }

  .postal-first {
    width: 30%;
  }

  .postal-second {
    width: 70%;
  }

  .search-button {
    width: 100%;
    height: 36px;
    font-size: 10px;
    margin-top: 15px;
  }

  .date-select {
    height: 36px;
    font-size: 10px;
  }

  .prefecture-dropdown {
    width: 160px;
  }
  .year-date {
    width: 90px;
  }

  .month-date,
  .day-date {
    width: 70px;
  }

  /* 日付 */
  .date-row {
    gap: 6px;
  }

  .date-row span {
    font-size: 11px;
  }

  .eye-icon {
    width: 16px;
    height: 16px;
  }

  /* ボタン */
  .button-area {
    margin-top: 40px;
    gap: 20px;
  }

  .submit-button,
  .cancel-button {
    width: 50%;
    height: 36px;
    font-size: 9px;
  }
}
</style>
