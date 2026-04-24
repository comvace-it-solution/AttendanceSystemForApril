<script setup lang="ts">
import { ref } from 'vue'

// 初期値を true にして、画面読み込み時に開いた状態にします
const dialogVisible = ref(true)
</script>


<template>
  <div class="container">
    <el-button type="primary" @click="dialogVisible = true">
      ダイアログを再表示
    </el-button>

    <el-dialog
      v-model="dialogVisible"
      title="レイアウト確認用（背景青）"
      width="500px"
      class="custom-blue-dialog"
      :close-on-click-modal="false"
    >
      <div class="content-preview">
        <p>ここにメインコンテンツが入ります。</p>
        <p>背景が青色の場合の文字の読みやすさや、余白感を確認してください。</p>
      </div>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">キャンセル</el-button>
          <el-button type="primary" color="#ffffff" style="color: #0056b3;" @click="dialogVisible = false">
            保存する
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>


<style scoped>
.container {
  padding: 20px;
}

/* ダイアログ全体のカスタマイズ */
:deep(.custom-blue-dialog) {
  background-color: #0056b3 !important; /* 鮮やかな青 */
  border-radius: 12px;
  overflow: hidden;
}

/* ヘッダーのカスタマイズ */
:deep(.custom-blue-dialog .el-dialog__header) {
  margin-right: 0;
  padding-bottom: 20px;
}

:deep(.custom-blue-dialog .el-dialog__title) {
  color: #ffffff !important;
  font-weight: bold;
}

/* 閉じる(×)ボタンの色 */
:deep(.custom-blue-dialog .el-dialog__headerbtn .el-dialog__close) {
  color: #ffffff !important;
}

/* ボディ（中身）のカスタマイズ */
:deep(.custom-blue-dialog .el-dialog__body) {
  color: #e0f0ff !important; /* 少しだけ青みのある白で目に優しく */
  font-size: 16px;
  line-height: 1.6;
}

/* フッターのカスタマイズ */
:deep(.custom-blue-dialog .el-dialog__footer) {
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.2); /* 境界線を薄く入れる */
}
</style>





<!-- <script setup lang="ts">
import { useAuth } from '../composables/useAuth'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const { logout } = useAuth()
const authStore = useAuthStore()
const router = useRouter()

const onLogoutClick = () => {
  // 1. Piniaの状態とlocalStorageをクリア
  logout()
  
  // 2. ログイン画面へリダイレクト
  router.push('/login')
  
  // 任意：ログアウトしたことを通知
  alert('ログアウトしました')
}
</script>

<template>
  <div class="dashboard-container">
    <p>ユーザー名：{{ authStore.user?.userName }} </p>
    <p>ユーザーID: {{ authStore.user?.userId }} </p>

    <div class="logout-section">
      <button 
        @click="onLogoutClick" 
        class="logout-button"
      >
        ログアウト
      </button>
    </div>
  </div>
</template>

<style scoped>
.logout-button {
  background-color: #f56c6c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #f78989;
}
</style> -->