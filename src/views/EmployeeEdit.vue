<!-- 従業員編集： EmployeeEdit.vue -->
<template>
  <main class="employee-register-page">
    <h1 class="page-title">従業員編集</h1>
    <!-- 登録フォーム -->
    <form class="register-form" @submit.prevent="handleUpdate">
      <!-- ユーザー名 -->
      <div class="form-group">
        <label>
          <span class="required">必須</span>
          ユーザー名
        </label>
        <input
          v-model="editForm.userName"
          type="text"
          placeholder="例: 山田花子"
        />
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
          v-model="editForm.email"
          type="email"
          placeholder="例: contact@example.com"
        />
        <!-- エラーメッセージ -->
        <p v-if="errors.email" class="error-message">
          {{ errors.email }}
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
          v-model="editForm.phoneNumber"
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
            v-model="editForm.prefecture"
            :class="{ selected: editForm.prefecture }"
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
          v-model="editForm.streetAddress"
          type="text"
          placeholder="例: ○○区○○"
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
          v-model="editForm.buildingName"
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
          <template v-for="item in birthDateSelects" :key="item.type">
            <select
              v-model="item.model.value"
              :class="[
                'date-select',
                item.className,
                { selected: item.model.value },
              ]"
            >
              <option value="">{{ item.placeholder }}</option>
              <option
                v-for="option in item.options"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
            <span>{{ item.label }}</span>
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
              <option value="">{{ item.placeholder }}</option>
              <option
                v-for="option in item.options"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
            <span>{{ item.label }}</span>
          </template>
        </div>
        <!-- エラーメッセージ -->
        <p v-if="errors.assignmentDate" class="error-message">
          {{ errors.assignmentDate }}
        </p>
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
      <!-- パスワード変更時のみ表示 -->
      <template v-if="isPasswordChange">
        <!-- パスワード -->
        <div class="password-group">
          <label>
            <span class="required">必須</span>
            パスワード
          </label>
          <div class="input-icon-wrap">
            <input
              :type="isPasswordVisible ? 'text' : 'password'"
              v-model="editForm.password"
              placeholder="半角英数混合6文字"
            />
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
        <div class="password-group">
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
      </template>
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
/** ========================
 * Import
 * ===================== */
import { ref, toRef, computed, watch, onMounted, reactive } from 'vue'
import { useZipCode } from '../composables/useZipCode'
import { useRoute } from 'vue-router'
import { useEmployeeDetail } from '../composables/useEmployeeDetail'
import { useEmployeeEdit } from '../composables/useEmployeeEdit'

/** ========================
 * Router
 * ===================== */
const route = useRoute()

/** ========================
 * Composables
 * ===================== */
const { searchAddressByPostalCode } = useZipCode()
const { employeeDetail, fetchEmployeeDetail } = useEmployeeDetail()
const { updateEmployee } = useEmployeeEdit()

/** ========================
 * Reactive
 * ===================== */
/** 編集フォーム */
const editForm = reactive({
  userName: '',
  email: '',
  phoneNumber: '',
  prefecture: '',
  streetAddress: '',
  buildingName: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  assignmentYear: '',
  assignmentMonth: '',
  assignmentDay: '',
  password: '',
})

/** ========================
 * Ref
 * ===================== */
/** パスワード表示切替フラグ */
const isPasswordVisible = ref(false)
/** 確認用パスワード表示切替フラグ */
const isSecondPasswordVisible = ref(false)
/** 確認用パスワード */
const secondPassword = ref('')
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
/** 郵便番号 前半 */
const postalCodeFirst = ref('')
/** 郵便番号 後半 */
const postalCodeSecond = ref('')
/** パスワード変更有無 */
const isPasswordChange = ref(false)
/** 初期表示完了フラグ */
const isInitialized = ref(false)

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
    model: toRef(editForm, 'birthYear'),
    options: birthYears,
    placeholder: 'YYYY',
    className: 'year-date',
    label: '年',
  },
  {
    type: 'month',
    model: toRef(editForm, 'birthMonth'),
    options: Array.from({ length: 12 }, (_, i) =>
      String(i + 1).padStart(2, '0'),
    ),
    placeholder: 'MM',
    className: 'month-date',
    label: '月',
  },
  {
    type: 'day',
    model: toRef(editForm, 'birthDay'),
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
    model: toRef(editForm, 'assignmentYear'),
    options: assignYears,
    placeholder: 'YYYY',
    className: 'year-date',
    label: '年',
  },
  {
    type: 'month',
    model: toRef(editForm, 'assignmentMonth'),
    options: Array.from({ length: 12 }, (_, i) =>
      String(i + 1).padStart(2, '0'),
    ),
    placeholder: 'MM',
    className: 'month-date',
    label: '月',
  },
  {
    type: 'day',
    model: toRef(editForm, 'assignmentDay'),
    options: Array.from({ length: assignDays.value }, (_, i) =>
      String(i + 1).padStart(2, '0'),
    ),
    placeholder: 'DD',
    className: 'day-date',
    label: '日',
  },
])

/** ========================
 * Watch
 * ===================== */
/** 生年月日変更時、日をリセット */
watch(
  () => [editForm.birthYear, editForm.birthMonth],
  () => {
    if (!isInitialized.value) {
      return
    }

    editForm.birthDay = ''
  },
)
/** 配属日変更時、日をリセット */
watch(
  () => [editForm.assignmentYear, editForm.assignmentMonth],
  () => {
    if (!isInitialized.value) {
      return
    }

    editForm.assignmentDay = ''
  },
)

/** ========================
 * Formatters
 * ===================== */
/** 日付を年月日に分割 */
const splitDate = (date: string) => {
  const [year, month, day] = date.split('-')

  return {
    year,
    month,
    day,
  }
}
/** 電話番号をハイフン付きに変換 */
const formatPhone = (phoneNumber: string) => {
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
}
/** 郵便番号を分割 */
const splitPostalCode = (postalCode: string) => {
  return {
    first: postalCode.slice(0, 3),
    second: postalCode.slice(3, 7),
  }
}

/** ========================
 * Functions
 * ===================== */
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
  /** 都道府県設定 */
  editForm.prefecture = address.prefecture
  /** 市区町村・町名設定 */
  editForm.streetAddress = `${address.city}${address.town}`
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
/** バリデーション */
const validateForm = () => {
  clearErrors()
  let isValid = true
  /** ユーザー名 */
  if (!editForm.userName) {
    setError('userName', 'ユーザー名の入力は必須です。')
    isValid = false
  } else if (editForm.userName.length >= 51) {
    setError('userName', 'ユーザー名は50文字以内で入力してください。')
    isValid = false
  }
  /** メールアドレス */
  if (!editForm.email) {
    setError('email', 'メールアドレスの入力は必須です。')
    isValid = false
  } else if (/\s/.test(editForm.email)) {
    setError('email', 'メールアドレスは空白を含めずに入力してください。')
    isValid = false
  } else if (!editForm.email.includes('@')) {
    setError('email', 'メールアドレスに「@」を含めて入力してください。')
    isValid = false
  } else if ((editForm.email.match(/@/g) || []).length >= 2) {
    setError('email', 'メールアドレスに「@」は1つだけ入力してください。')
    isValid = false
  } else {
    const [localPart, domainPart] = editForm.email.split('@')
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
  /** 電話番号 */
  const phoneNumber = editForm.phoneNumber.replace(/-/g, '')
  if (!phoneNumber) {
    setError('phoneNumber', '電話番号の入力は必須です。')
    isValid = false
  } else if (!/^\d{11}$/.test(phoneNumber)) {
    setError('phoneNumber', '正しい電話番号を入力してください。')
    isValid = false
  } else if (!/^(060|070|080|090)/.test(phoneNumber)) {
    setError('phoneNumber', '携帯電話番号を入力してください。')
    isValid = false
  } else if (/^(\d)\1+$/.test(phoneNumber)) {
    setError('phoneNumber', '正しい電話番号を入力してください。')
    isValid = false
  }
  /** 郵便番号 */
  if (!postalCodeFirst.value || !postalCodeSecond.value) {
    setError('postalCode', '郵便番号の入力は必須です。')
    isValid = false
  } else if (
    postalCodeFirst.value.length !== 3 ||
    postalCodeSecond.value.length !== 4
  ) {
    setError('postalCode', '郵便番号は上3桁・下4桁で入力してください。')
    isValid = false
  } else if (
    !/^\d+$/.test(postalCodeFirst.value) ||
    !/^\d+$/.test(postalCodeSecond.value)
  ) {
    setError('postalCode', '郵便番号は半角数字で入力してください。')
    isValid = false
  }
  /** 都道府県 */
  if (!editForm.prefecture) {
    setError('prefecture', '都道府県を選択してください。')
    isValid = false
  }
  /** 住所 */
  if (!editForm.streetAddress) {
    setError('streetAddress', '住所の入力は必須です。')
    isValid = false
  } else if (editForm.streetAddress.length > 255) {
    setError('streetAddress', '住所は255文字以内で入力してください。')
    isValid = false
  }
  /** 建物名 */
  if (editForm.buildingName.length > 255) {
    setError('buildingName', '建物名は255文字以内で入力してください。')
    isValid = false
  }
  /** 生年月日 */
  if (!editForm.birthYear || !editForm.birthMonth || !editForm.birthDay) {
    setError('birthDate', '生年月日の入力は必須です。')
    isValid = false
  } else {
    const birthDate = new Date(
      `${editForm.birthYear}-${editForm.birthMonth}-${editForm.birthDay}`,
    )
    const today = new Date()

    if (birthDate > today) {
      setError('birthDate', '未来の日付は選択できません。')
      isValid = false
    }
    if (
      editForm.assignmentYear &&
      editForm.assignmentMonth &&
      editForm.assignmentDay
    ) {
      const assignmentDate = new Date(
        `${editForm.assignmentYear}-${editForm.assignmentMonth}-${editForm.assignmentDay}`,
      )

      if (birthDate >= assignmentDate) {
        setError('birthDate', '生年月日に配属日以降の日付は指定できません。')
        isValid = false
      }
    }
  }
  /** 配属日 */
  if (
    !editForm.assignmentYear ||
    !editForm.assignmentMonth ||
    !editForm.assignmentDay
  ) {
    setError('assignmentDate', '配属日の入力は必須です。')
    isValid = false
  } else if (editForm.birthYear && editForm.birthMonth && editForm.birthDay) {
    const birthDate = new Date(
      `${editForm.birthYear}-${editForm.birthMonth}-${editForm.birthDay}`,
    )
    const assignmentDate = new Date(
      `${editForm.assignmentYear}-${editForm.assignmentMonth}-${editForm.assignmentDay}`,
    )
    if (assignmentDate <= birthDate) {
      setError('assignmentDate', '配属日に生年月日以前の日付は指定できません。')
      isValid = false
    }
  }
  /** パスワード変更時のみ */
  if (isPasswordChange.value) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6}$/

    if (!editForm.password) {
      setError('password', 'パスワードの入力は必須です。')
      isValid = false
    } else if (!passwordRegex.test(editForm.password)) {
      setError(
        'password',
        'パスワードは半角英字と半角数字の両方を含む6文字で入力してください。',
      )
      isValid = false
    } else if (editForm.password !== secondPassword.value) {
      setError(
        'password',
        'パスワードとパスワード（確認用）が一致していません。',
      )
      isValid = false
    }
    if (!secondPassword.value) {
      setError('secondPassword', 'パスワード（確認用）の入力は必須です。')
      isValid = false
    } else if (!passwordRegex.test(secondPassword.value)) {
      setError(
        'secondPassword',
        'パスワード（確認用）は半角英字と半角数字の両方を含む6文字で入力してください。',
      )
      isValid = false
    } else if (editForm.password !== secondPassword.value) {
      setError(
        'secondPassword',
        'パスワードとパスワード（確認用）が一致していません。',
      )
      isValid = false
    }
  }
  return isValid
}
/** 更新処理 */
const handleUpdate = async () => {
  /** バリデーションNG時は処理終了 */
  if (!validateForm()) {
    return
  }
  /** ログインユーザーID */
  const userId = Number(route.params.id)

  /** API送信用データ */
  const requestBody = {
    /** ユーザー名 */
    userName: editForm.userName,
    /** パスワード変更時のみ送信 */
    password: isPasswordChange.value ? editForm.password : undefined,
    /** メールアドレス */
    email: editForm.email,
    /** ハイフン除去 */
    phoneNumber: editForm.phoneNumber.replace(/-/g, ''),
    /** 郵便番号結合 */
    postalCode: postalCodeFirst.value + postalCodeSecond.value,
    /** 都道府県 */
    prefecture: editForm.prefecture,
    /** 市区町村・町名 */
    streetAddress: editForm.streetAddress,
    /** 建物名 */
    buildingName: editForm.buildingName,
    /** 生年月日変換 */
    birthDate: `${editForm.birthYear}-${editForm.birthMonth}-${editForm.birthDay}`,
    /** 配属日変換 */
    assignmentDate: `${editForm.assignmentYear}-${editForm.assignmentMonth}-${editForm.assignmentDay}`,
  }

  /** 従業員更新API実行 */
  await updateEmployee(userId, requestBody, isPasswordChange.value)
}

/** ========================
 * Lifecycle
 * ===================== */
/** 初期表示時 */
onMounted(async () => {
  /** ログインユーザーID */
  const userId = Number(route.params.id)
  /** 従業員詳細取得 */
  await fetchEmployeeDetail(userId)
  /** 詳細データなし */
  if (!employeeDetail.value) {
    return
  }
  /** 生年月日分割 */
  const birthDate = splitDate(employeeDetail.value.birthDate)
  /** 配属日分割 */
  const assignmentDate = splitDate(employeeDetail.value.assignmentDate)
  /** 郵便番号分割 */
  const postalCode = splitPostalCode(employeeDetail.value.postalCode)
  /** フォーム初期値設定 */
  editForm.userName = employeeDetail.value.userName
  editForm.email = employeeDetail.value.email
  /** 電話番号整形 */
  editForm.phoneNumber = formatPhone(employeeDetail.value.phoneNumber)
  /** 郵便番号設定 */
  postalCodeFirst.value = postalCode.first
  postalCodeSecond.value = postalCode.second
  /** 住所設定 */
  editForm.prefecture = employeeDetail.value.prefecture
  editForm.streetAddress = employeeDetail.value.streetAddress
  editForm.buildingName = employeeDetail.value.buildingName
  /** 生年月日設定 */
  editForm.birthYear = birthDate.year
  editForm.birthMonth = birthDate.month
  editForm.birthDay = birthDate.day
  /** 配属日設定 */
  editForm.assignmentYear = assignmentDate.year
  editForm.assignmentMonth = assignmentDate.month
  editForm.assignmentDay = assignmentDate.day
})
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
.password-group {
  margin-top: 25px;
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
input[type='checkbox'] {
  accent-color: #de2583;
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
  /* パスワード変更エリア */
  .password-change-title {
    font-size: 13px;
  }

  .password-check-button {
    width: 100%;
    height: 36px;
  }
  .error-message {
    font-size: 8px;
  }
}
</style>
