<!-- 従業員編集： EmployeeEdit.vue -->
<template>
  <main class="employee-edit-page">
    <h1 class="page-title">従業員編集</h1>

    <form class="edit-form">
      <div class="form-group">
        <label><span class="required">必須</span>ユーザー名</label>
        <input type="text" value="伊地智 明佳" />
      </div>

      <div class="form-group">
        <label><span class="required">必須</span>メールアドレス</label>
        <input type="email" value="ice-creeeeem@gmail.com" />
      </div>

      <div class="form-group">
        <div class="label-row">
          <label><span class="required">必須</span>電話番号</label>
          <p class="helper-text">※ハイフン(-)は自動で入力されます。</p>
        </div>
        <input type="tel" value="090-1234-5678" />
      </div>

      <div class="form-group">
        <label><span class="required">必須</span>郵便番号</label>
        <div class="postal-row">
          <input class="postal-first" type="text" value="114" />
          <span class="hyphen">ー</span>
          <input class="postal-second" type="text" value="0033" />
          <button type="button" class="search-button">郵便番号検索</button>
        </div>
      </div>

      <div class="form-group prefecture-group">
        <label><span class="required">必須</span>都道府県</label>
        <select>
          <option>東京都</option>
        </select>
      </div>

      <div class="form-group">
        <label><span class="required">必須</span>住所</label>
        <input type="text" value="北区東十条 1丁目" />
      </div>

      <div class="form-group">
        <label>建物名</label>
        <input type="text" value="十条タウン 101" />
      </div>

      <div class="form-group">
        <label><span class="required">必須</span>生年月日</label>
        <div class="date-row">
          <select>
            <option>1999</option>
          </select>
          <span>年</span>
          <select>
            <option>06</option>
          </select>
          <span>月</span>
          <select>
            <option>19</option>
          </select>
          <span>日</span>
        </div>
      </div>

      <div class="form-group">
        <label><span class="required">必須</span>配属日</label>
        <div class="date-row">
          <select>
            <option>2026</option>
          </select>
          <span>年</span>
          <select>
            <option>04</option>
          </select>
          <span>月</span>
          <select>
            <option>15</option>
          </select>
          <span>日</span>
        </div>
      </div>

      <div class="password-change-area">
        <p class="password-change-title">
          パスワードを変更する場合チェックしてください
        </p>

        <label class="password-check-button">
          <input type="checkbox" checked />
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

<script setup lang="ts"></script>

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
