<!-- 従業員詳細： EmployeeDetail.vue -->
<template>
  <main class="employee-detail-page">
    <h1 class="page-title">従業員詳細</h1>

    <div class="detail-list">
      <div class="detail-item">
        <div class="detail-label">ユーザー名：</div>
        <div class="detail-value">伊地智 明佳</div>
      </div>

      <div class="detail-item">
        <div class="detail-label">メールアドレス：</div>
        <div class="detail-value">ice-creeeeem@gmail.com</div>
      </div>

      <div class="detail-item">
        <div class="detail-label">パスワード：</div>
        <div class="detail-value">＊＊＊＊＊＊</div>
      </div>

      <div class="detail-item">
        <div class="detail-label">生年月日：</div>
        <div class="detail-value">1999/06/19</div>
      </div>

      <div class="detail-item">
        <div class="detail-label">電話番号：</div>
        <div class="detail-value">090-1234-5678</div>
      </div>

      <div class="detail-item">
        <div class="detail-label">郵便番号：</div>
        <div class="detail-value">114-0033</div>
      </div>

      <div class="detail-item">
        <div class="detail-label">住所：</div>
        <div class="detail-value">
          東京都北区東十条１丁目　十条タウン　１０１
        </div>
      </div>

      <div class="detail-item">
        <div class="detail-label">配属日：</div>
        <div class="detail-value">2026/04/15</div>
      </div>
    </div>

    <div class="button-area">
      <button type="button" class="edit-button">編集する</button>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

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
