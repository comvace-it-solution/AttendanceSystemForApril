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
        <!-- エラーメッセージ -->
        <p v-if="errors.userName" class="error-message">
          {{ errors.userName }}
        </p>
      </div>
      <!-- メールアドレス -->
      <div class="form-group">
        <label>
          <span class="required">必須</span>
          メールアドレス
        </label>
        <input
          v-model="form.email"
          type="text"
          placeholder="例: contact@example.com"
        />
        <!-- エラーメッセージ -->
        <p v-if="errors.email" class="error-message">
          {{ errors.email }}
        </p>
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
        <!-- エラーメッセージ -->
        <p v-if="errors.password" class="error-message">
          {{ errors.password }}
        </p>
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
        <!-- エラーメッセージ -->
        <p v-if="errors.secondPassword" class="error-message">
          {{ errors.secondPassword }}
        </p>
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
        <!-- エラーメッセージ -->
        <p v-if="errors.phoneNumber" class="error-message">
          {{ errors.phoneNumber }}
        </p>
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
        <!-- エラーメッセージ -->
        <p v-if="errors.postalCode" class="error-message">
          {{ errors.postalCode }}
        </p>
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
        <!-- エラーメッセージ -->
        <p v-if="errors.prefecture" class="error-message">
          {{ errors.prefecture }}
        </p>
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
          @input="convertToFullWidth('streetAddress')"
        />
        <!-- エラーメッセージ -->
        <p v-if="errors.streetAddress" class="error-message">
          {{ errors.streetAddress }}
        </p>
      </div>
      <!-- 建物名 -->
      <div class="form-group">
        <label>建物名</label>
        <input
          v-model="form.buildingName"
          type="text"
          placeholder="例: ○○タウン 101"
          @input="convertToFullWidth('buildingName')"
        />
        <!-- エラーメッセージ -->
        <p v-if="errors.buildingName" class="error-message">
          {{ errors.buildingName }}
        </p>
      </div>
      <!-- 生年月日 -->
      <div class="form-group">
        <label>
          <span class="required">必須</span>
          生年月日
        </label>
        <div class="date-row">
          <template v-for="item in birthDateSelects" :key="item.type">
            <select
              v-model="item.model.value"
              :class="[
                'date-select',
                item.className,
                { selected: item.model.value },
              ]"
            >
              <option value="">
                {{ item.placeholder }}
              </option>
              <option
                v-for="option in item.options"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
            <span>
              {{ item.label }}
            </span>
          </template>
        </div>
        <!-- エラーメッセージ -->
        <p v-if="errors.birthDate" class="error-message">
          {{ errors.birthDate }}
        </p>
      </div>
      <!-- 配属日 -->
      <div class="form-group">
        <label>
          <span class="required">必須</span>
          配属日
        </label>
        <div class="date-row">
          <template v-for="item in assignDateSelects" :key="item.type">
            <select
              v-model="item.model.value"
              :class="[
                'date-select',
                item.className,
                { selected: item.model.value },
              ]"
            >
              <option value="">
                {{ item.placeholder }}
              </option>
              <option
                v-for="option in item.options"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
            <span>
              {{
                item.type === 'year'
                  ? '年'
                  : item.type === 'month'
                    ? '月'
                    : '日'
              }}
            </span>
          </template>
        </div>
        <!-- エラーメッセージ -->
        <p v-if="errors.assignmentDate" class="error-message">
          {{ errors.assignmentDate }}
        </p>
      </div>
      <!-- ボタン -->
      <div class="button-area">
        <!-- 登録 -->
        <button type="submit" class="submit-button">上記の内容で登録</button>
        <!-- キャンセル -->
        <button type="button" class="cancel-button" @click="clearForm">
          キャンセル
        </button>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
/** ========================
 * Import
 * ===================== */
import { ref, computed, watch } from 'vue'
import { useEmployeeRegister } from '../composables/useEmployeeRegister'
import { useZipCode } from '../composables/useZipCode'
import { useRouter } from 'vue-router'

/** ========================
 * Composables
 * ===================== */
const { searchAddressByPostalCode } = useZipCode()
const { form, onRegister } = useEmployeeRegister()
const router = useRouter()

/** ========================
 * Reactive
 * ===================== */

/** ========================
 * Ref
 * ===================== */
/** パスワード表示切替フラグ */
const isPasswordVisible = ref(false)
/** 確認用パスワード表示切替フラグ */
const isSecondPasswordVisible = ref(false)
/** 確認用パスワード */
const secondPassword = ref('')
/** 郵便番号前半3桁 */
const postalCodeFirst = ref('')
/** 郵便番号後半4桁 */
const postalCodeSecond = ref('')
/** 生年月日 年 */
const birthYear = ref('')
/** 生年月日 月 */
const birthMonth = ref('')
/** 生年月日 日 */
const birthDay = ref('')
/** 配属日 年 */
const assignYear = ref('')
/** 配属日 月 */
const assignMonth = ref('')
/** 配属日 日 */
const assignDay = ref('')

/** エラーメッセージ */
const errors = ref({
  userName: '',
  email: '',
  password: '',
  secondPassword: '',
  phoneNumber: '',
  postalCode: '',
  prefecture: '',
  streetAddress: '',
  birthDate: '',
  assignmentDate: '',
  buildingName: '',
})

/** ========================
 * Constants
 * ===================== */
/** 現在年 */
const currentYear = new Date().getFullYear()
/** 生年月日 年一覧 */
const birthYears = Array.from({ length: 100 }, (_, i) => currentYear - i)
/** 配属日 年一覧 */
const assignYears = Array.from({ length: 111 }, (_, i) => currentYear + 10 - i)
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

/** 入力値クリア */
const clearForm = () => {
  /** クリア前 */
  console.log('クリア前', {
    userName: form.userName,
    email: form.email,
    password: form.password,
    phoneNumber: form.phoneNumber,
    postalCodeFirst: postalCodeFirst.value,
    postalCodeSecond: postalCodeSecond.value,
    prefecture: form.prefecture,
    streetAddress: form.streetAddress,
    buildingName: form.buildingName,
  })

  /** フォーム */
  form.userName = ''
  form.email = ''
  form.password = ''
  form.phoneNumber = ''
  form.postalCode = ''
  form.prefecture = ''
  form.streetAddress = ''
  form.buildingName = ''
  form.birthDate = ''
  form.assignmentDate = ''

  /** 確認用パスワード */
  secondPassword.value = ''

  /** 郵便番号 */
  postalCodeFirst.value = ''
  postalCodeSecond.value = ''

  /** 生年月日 */
  birthYear.value = ''
  birthMonth.value = ''
  birthDay.value = ''

  /** 配属日 */
  assignYear.value = ''
  assignMonth.value = ''
  assignDay.value = ''

  /** エラー */
  clearErrors()

  /** クリア後 */
  console.log('クリア後', {
    userName: form.userName,
    email: form.email,
    password: form.password,
    phoneNumber: form.phoneNumber,
    postalCodeFirst: postalCodeFirst.value,
    postalCodeSecond: postalCodeSecond.value,
    prefecture: form.prefecture,
    streetAddress: form.streetAddress,
    buildingName: form.buildingName,
  })

  /** 画面遷移 */
  router.push({ name: 'Home' })
}
/** ========================
 * Computed
 * ===================== */
/** 生年月日の日数制御 */
const birthDays = computed(() => {
  if (!birthYear.value || !birthMonth.value) {
    return 31
  }
  return new Date(
    Number(birthYear.value),
    Number(birthMonth.value),
    0,
  ).getDate()
})
/** 配属日の日数制御 */
const assignDays = computed(() => {
  if (!assignYear.value || !assignMonth.value) {
    return 31
  }
  return new Date(
    Number(assignYear.value),
    Number(assignMonth.value),
    0,
  ).getDate()
})
/** 生年月日セレクト一覧 */
const birthDateSelects = computed(() => [
  {
    type: 'year',
    model: birthYear,
    options: birthYears,
    placeholder: 'YYYY',
    className: 'year-date',
    label: '年',
  },

  {
    type: 'month',
    model: birthMonth,
    options: Array.from({ length: 12 }, (_, i) =>
      String(i + 1).padStart(2, '0'),
    ),
    placeholder: 'MM',
    className: 'month-date',
    label: '月',
  },

  {
    type: 'day',
    model: birthDay,
    options: Array.from({ length: birthDays.value }, (_, i) =>
      String(i + 1).padStart(2, '0'),
    ),
    placeholder: 'DD',
    className: 'day-date',
    label: '日',
  },
])
/** 配属日セレクト一覧 */
const assignDateSelects = computed(() => [
  {
    type: 'year',
    model: assignYear,
    options: assignYears,
    placeholder: 'YYYY',
    className: 'year-date',
  },

  {
    type: 'month',
    model: assignMonth,
    options: Array.from({ length: 12 }, (_, i) =>
      String(i + 1).padStart(2, '0'),
    ),
    placeholder: 'MM',
    className: 'month-date',
  },

  {
    type: 'day',
    model: assignDay,
    options: Array.from({ length: assignDays.value }, (_, i) =>
      String(i + 1).padStart(2, '0'),
    ),
    placeholder: 'DD',
    className: 'day-date',
  },
])

/** ========================
 * Watch
 * ===================== */
/** 生年月日変更時、日をリセット */
watch([birthYear, birthMonth], () => {
  birthDay.value = ''
})
/** 配属日変更時、日をリセット */
watch([assignYear, assignMonth], () => {
  assignDay.value = ''
})

/** ========================
 * Formatters
 * ===================== */
/** 全角変換 */
const convertToFullWidth = (key: 'streetAddress' | 'buildingName') => {
  form[key] = form[key]
    .normalize('NFKC')
    .replace(/[!-~]/g, (s) => String.fromCharCode(s.charCodeAt(0) + 0xfee0))
    .replace(/ /g, '　')
}
/**
 * 電話番号フォーマット
 * 全角→半角変換
 * ハイフン自動付与
 */
const formatPhone = () => {
  let value = form.phoneNumber
  /** 全角数字を半角変換 */
  value = value.replace(/[０-９]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0),
  )
  /** 数字以外除去 */
  value = value.replace(/\D/g, '')
  /** ハイフン付与 */
  if (value.length > 3 && value.length <= 7) {
    value = value.replace(/(\d{3})(\d+)/, '$1-$2')
  } else if (value.length > 7) {
    value = value.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3')
  }
  form.phoneNumber = value
}

/** ========================
 * Functions
 * ===================== */
/** 郵便番号検索 */
const onSearchPostalCode = async () => {
  errors.value.postalCode = ''
  /** 郵便番号バリデーションNG時は処理終了 */
  if (!validatePostalCode()) {
    return
  }
  const postalCode = postalCodeFirst.value + postalCodeSecond.value
  const address = await searchAddressByPostalCode(postalCode)
  if (!address) {
    setError('postalCode', '正しい郵便番号を入力してください。')
    return
  }
  /** 都道府県設定 */
  form.prefecture = address.prefecture
  /** 市区町村・町名設定 */
  form.streetAddress = `${address.city}${address.town}`
}
/** エラーメッセージ設定 */
const setError = (key: keyof typeof errors.value, message: string) => {
  errors.value[key] = `＊${message}`
}
/** エラーメッセージ初期化 */
const clearErrors = () => {
  errors.value = {
    userName: '',
    email: '',
    password: '',
    secondPassword: '',
    phoneNumber: '',
    postalCode: '',
    prefecture: '',
    streetAddress: '',
    birthDate: '',
    assignmentDate: '',
    buildingName: '',
  }
}
/** 郵便番号バリデーション */
const validatePostalCode = () => {
  if (!postalCodeFirst.value && !postalCodeSecond.value) {
    setError('postalCode', '郵便番号の入力は必須です。')
    return false
  } else if (
    !/^\d+$/.test(postalCodeFirst.value) ||
    !/^\d+$/.test(postalCodeSecond.value)
  ) {
    setError('postalCode', '郵便番号は半角数字で入力してください。')
    return false
  } else if (
    postalCodeFirst.value.length !== 3 ||
    postalCodeSecond.value.length !== 4
  ) {
    setError('postalCode', '郵便番号は上3桁・下4桁で入力してください。')
    return false
  }

  return true
}
/** バリデーション */
const validateForm = () => {
  clearErrors()
  let isValid = true
  /** ユーザー名 */
  if (!form.userName) {
    setError('userName', 'ユーザー名の入力は必須です。')
    isValid = false
  } else if (form.userName.length >= 51) {
    setError('userName', 'ユーザー名は50文字以内で入力してください。')
    isValid = false
  }
  /** パスワード */
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6}$/

  if (!form.password) {
    setError('password', 'パスワードの入力は必須です。')
    isValid = false
  } else if (!passwordRegex.test(form.password)) {
    setError(
      'password',
      'パスワードは半角英字と半角数字の両方を含む6文字で入力してください。',
    )
    isValid = false
  }
  /** パスワード確認 */
  if (!secondPassword.value) {
    setError('secondPassword', 'パスワード（確認用）の入力は必須です。')
    isValid = false
  } else if (!passwordRegex.test(secondPassword.value)) {
    setError(
      'secondPassword',
      'パスワード（確認用）は半角英字と半角数字の両方を含む6文字で入力してください。',
    )
    isValid = false
  } else if (form.password !== secondPassword.value) {
    setError('password', 'パスワードとパスワード（確認用）が一致していません。')
    setError(
      'secondPassword',
      'パスワードとパスワード（確認用）が一致していません。',
    )
    isValid = false
  }
  /** メールアドレス */
  if (!form.email) {
    setError('email', 'メールアドレスの入力は必須です。')
    isValid = false
  } else if (/\s/.test(form.email)) {
    setError('email', 'メールアドレスは空白を含めずに入力してください。')
    isValid = false
  } else if (!form.email.includes('@')) {
    setError('email', 'メールアドレスに「@」を含めて入力してください。')
    isValid = false
  } else if ((form.email.match(/@/g) || []).length >= 2) {
    setError('email', 'メールアドレスに「@」は1つだけ入力してください。')
    isValid = false
  } else {
    const [localPart, domainPart] = form.email.split('@')
    if (!localPart) {
      setError('email', 'メールアドレスの「@」の前に文字を入力してください。')
      isValid = false
    } else if (!domainPart) {
      setError('email', 'メールアドレスの「@」の後に文字を入力してください。')
      isValid = false
    } else if (!domainPart.includes('.')) {
      setError(
        'email',
        'メールアドレスのドメイン部分に「.」を含めて入力してください。',
      )
      isValid = false
    } else {
      const dotIndex = domainPart.indexOf('.')

      if (dotIndex === 0) {
        setError('email', 'メールアドレスの「.」の前に文字を入力してください。')
        isValid = false
      } else if (dotIndex === domainPart.length - 1) {
        setError('email', 'メールアドレスの「.」の後に文字を入力してください。')
        isValid = false
      }
    }
  }
  // TODO 従業員一覧画面マージ後、登録済みメールアドレスチェック追加

  /** 電話番号 */
  const phoneNumber = form.phoneNumber.replace(/-/g, '')
  if (!phoneNumber) {
    setError('phoneNumber', '電話番号の入力は必須です。')
    isValid = false
  } else if (!/^\d{11}$/.test(phoneNumber)) {
    setError('phoneNumber', '電話番号を正しく入力してください。')
    isValid = false
  } else if (/^(\d)\1+$/.test(phoneNumber)) {
    setError('phoneNumber', '正しい電話番号を入力してください。')
    isValid = false
  } else if (!/^(090|080|070)/.test(phoneNumber)) {
    setError('phoneNumber', '携帯電話番号を入力してください。')
    isValid = false
  }
  /** 郵便番号 */
  if (!validatePostalCode()) {
    isValid = false
  }
  /** 都道府県 */
  if (!form.prefecture) {
    setError('prefecture', '都道府県を選択してください。')
    isValid = false
  }
  /** 住所 */
  if (!form.streetAddress) {
    setError('streetAddress', '住所の入力は必須です。')
    isValid = false
  } else if (form.streetAddress.length > 255) {
    setError('streetAddress', '住所は255文字以内で入力してください。')
    isValid = false
  }
  /** 建物名 */
  if (form.buildingName.length > 255) {
    setError('buildingName', '建物名は255文字以内で入力してください。')
    isValid = false
  }
  /** 生年月日 */
  if (!birthYear.value || !birthMonth.value || !birthDay.value) {
    setError('birthDate', '生年月日の入力は必須です。')
    isValid = false
  } else {
    const birthDate = new Date(
      `${birthYear.value}-${birthMonth.value}-${birthDay.value}`,
    )
    const today = new Date()
    /** 生年月日が未来日 */
    if (birthDate > today) {
      setError('birthDate', '未来の日付は選択できません。')
      isValid = false
    }
    /** 配属日との前後関係 */
    if (assignYear.value && assignMonth.value && assignDay.value) {
      const assignmentDate = new Date(
        `${assignYear.value}-${assignMonth.value}-${assignDay.value}`,
      )
      if (birthDate >= assignmentDate) {
        setError('birthDate', '生年月日に配属日以降の日付は指定できません。')
        isValid = false
      }
    }
  }
  /** 配属日 */
  if (!assignYear.value || !assignMonth.value || !assignDay.value) {
    setError('assignmentDate', '配属日の入力は必須です。')
    isValid = false
  } else if (birthYear.value && birthMonth.value && birthDay.value) {
    const birthDate = new Date(
      `${birthYear.value}-${birthMonth.value}-${birthDay.value}`,
    )
    const assignmentDate = new Date(
      `${assignYear.value}-${assignMonth.value}-${assignDay.value}`,
    )
    if (assignmentDate <= birthDate) {
      setError('assignmentDate', '配属日に生年月日以前の日付は指定できません。')
      isValid = false
    }
  }
  return isValid
}

/** 登録処理 */
const handleRegister = async () => {
  /** バリデーションNG時は処理終了 */
  if (!validateForm()) {
    return
  }
  /**
   * 郵便番号結合
   * 114 + 0033 → 1140033
   */
  form.postalCode = postalCodeFirst.value + postalCodeSecond.value
  console.log('登録時の値「郵便番号」：', form.postalCode)

  /** 電話番号ハイフン除去 */
  form.phoneNumber = form.phoneNumber.replace(/-/g, '')
  console.log('登録時の値「電話番号」：', form.phoneNumber)

  /**
   * 生年月日整形
   * YYYY-MM-DD
   */
  form.birthDate =
    birthYear.value && birthMonth.value && birthDay.value
      ? `${birthYear.value}-${birthMonth.value}-${birthDay.value}`
      : ''
  console.log('登録時の値「生年月日」：', form.birthDate)

  /**
   * 配属日整形
   * YYYY-MM-DD
   */
  form.assignmentDate =
    assignYear.value && assignMonth.value && assignDay.value
      ? `${assignYear.value}-${assignMonth.value}-${assignDay.value}`
      : ''
  console.log('登録時の値「配属日」：', form.assignmentDate)

  /** 登録API送信内容 */
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
  /** API実行 */
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
.error-message {
  margin-top: 2px;
  color: #ff3b30;
  font-size: 10px;
  font-weight: 700;
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
  .error-message {
    font-size: 8px;
  }
}
</style>
