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

      <div class="form-group password-group">
        <label><span class="required">必須</span>パスワード</label>
        <div class="input-icon-wrap">
          <input type="password" placeholder="半角英数混合6文字" />
          <span class="eye-icon">⌁</span>
        </div>
      </div>

      <div class="form-group password-group">
        <label><span class="required">必須</span>パスワード（確認用）</label>
        <div class="input-icon-wrap">
          <input type="password" placeholder="半角英数混合6文字" />
          <span class="eye-icon">◉</span>
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
        <div class="postal-row">
          <input class="postal-first" type="text" placeholder="000" />
          <span class="hyphen">-</span>
          <input class="postal-second" type="text" placeholder="0000" />
          <button type="button" class="search-button">郵便番号検索</button>
        </div>
      </div>

      <div class="form-group prefecture-group">
        <label><span class="required">必須</span>都道府県</label>
        <select>
          <option>選択してください</option>
        </select>
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
          <select>
            <option>YYYY</option>
          </select>
          <span>年</span>
          <select>
            <option>MM</option>
          </select>
          <span>月</span>
          <select>
            <option>DD</option>
          </select>
          <span>日</span>
        </div>
      </div>

      <div class="form-group">
        <label><span class="required">必須</span>配属日</label>
        <div class="date-row">
          <select>
            <option>YYYY</option>
          </select>
          <span>年</span>
          <select>
            <option>MM</option>
          </select>
          <span>月</span>
          <select>
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

<script setup lang="ts"></script>

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
  font-size: 18px;
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
  padding: 2px 6px;
}

input,
select {
  width: 100%;
  height: 40px;
  border: 1px solid #bbb;
  padding: 0 12px;
  font-size: 12px;
  box-sizing: border-box;
  color: #333;
  background: #fff;
}

input::placeholder {
  color: #cfcfcf;
  font-weight: 700;
}

select {
  color: #aaa;
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
  font-size: 16px;
}

.postal-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.postal-first {
  width: 80px;
}

.postal-second {
  width: 120px;
}

.hyphen {
  color: #777;
}

.search-button {
  width: 150px;
  height: 40px;
  margin-left: auto;
  background: #de2583;
  color: #fff;
  border: none;
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

.date-row select {
  width: 120px;
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
    padding: 20px 12px 40px;
  }

  .page-title {
    font-size: 16px;
    margin-bottom: 24px;
  }

  .register-form {
    width: 100%;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    font-size: 11px;
  }

  .required {
    font-size: 9px;
    padding: 2px 4px;
  }

  input,
  select {
    height: 38px;
    font-size: 12px;
  }

  /* 郵便番号 */
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
    width: 110px;
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

  .date-row span {
    font-size: 11px;
  }

  /* アイコン */
  .eye-icon {
    right: 10px;
    font-size: 14px;
  }

  /* ボタン */
  .button-area {
    margin-top: 40px;
    gap: 20px;
  }

  .submit-button,
  .cancel-button {
    width: 100%;
    height: 44px;
    font-size: 14px;
  }
}
</style>
