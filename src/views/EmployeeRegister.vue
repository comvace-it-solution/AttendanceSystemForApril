<!-- 従業員登録： EmployeeRegister.vue -->
<template>
  <main class="employee-register-page">
    <h1 class="page-title">従業員登録</h1>

    <form class="register-form">
      <div class="form-group">
        <label><span class="required">必須</span>ユーザー名</label>
        <input type="text" placeholder="例: 山田花子" />
      </div>

      <div class="form-group">
        <label><span class="required">必須</span>メールアドレス</label>
        <input type="email" placeholder="例: contact@example.com" />
      </div>

      <div class="form-group">
        <label><span class="required">必須</span>パスワード</label>
        <div class="input-icon-wrap">
          <input
            :type="isPasswordVisible ? 'text' : 'password'"
            v-model="password"
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
      </div>

      <div class="form-group">
        <label><span class="required">必須</span>パスワード（確認用）</label>
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
      </div>

      <div class="form-group">
        <div class="label-row">
          <label><span class="required">必須</span>電話番号</label>
          <p class="helper-text">※ハイフン(-)は自動で入力されます。</p>
        </div>
        <input type="tel" placeholder="090-0000-0000" />
      </div>

      <div class="form-group">
        <label><span class="required">必須</span>郵便番号</label>
        <div class="postal-row sp-postal-row">
          <div class="postal-row">
            <input class="postal-first" type="text" placeholder="000" />
            <span class="hyphen">-</span>
            <input class="postal-second" type="text" placeholder="0000" />
          </div>
          <button type="button" class="search-button">郵便番号検索</button>
        </div>
      </div>

      <div class="form-group prefecture-group">
        <label><span class="required">必須</span>都道府県</label>
        <div class="date-row">
          <select class="date-select prefecture-dropdown">
            <option>選択してください</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label><span class="required">必須</span>住所</label>
        <input type="text" placeholder="例: ○○区○○" />
      </div>

      <div class="form-group">
        <label>建物名</label>
        <input type="text" placeholder="例: ○○タウン 101" />
      </div>

      <div class="form-group">
        <label><span class="required">必須</span>生年月日</label>
        <div class="date-row">
          <select class="date-select year-date">
            <option>YYYY</option>
          </select>
          <span>年</span>

          <select class="date-select month-date">
            <option>MM</option>
          </select>
          <span>月</span>

          <select class="date-select day-date">
            <option>DD</option>
          </select>
          <span>日</span>
        </div>
      </div>

      <div class="form-group">
        <label><span class="required">必須</span>配属日</label>
        <div class="date-row">
          <select class="date-select year-date">
            <option>YYYY</option>
          </select>
          <span>年</span>

          <select class="date-select month-date">
            <option>MM</option>
          </select>
          <span>月</span>

          <select class="date-select day-date">
            <option>DD</option>
          </select>
          <span>日</span>
        </div>
      </div>

      <div class="button-area">
        <button type="submit" class="submit-button">上記の内容で登録</button>
        <button type="button" class="cancel-button">キャンセル</button>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/** パスワードアイコンのホバー状態を管理 */
const isPasswordVisible = ref(false)
/** パスワード確認用アイコンのホバー状態を管理 */
const isSecondPasswordVisible = ref(false)

const password = ref('')
const secondPassword = ref('')
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
