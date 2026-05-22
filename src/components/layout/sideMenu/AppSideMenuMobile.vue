<!-- サイドメニューコンポーネント モバイル用： AppSideMenuMobile.vue -->

<template>
  <div>
    <div class="sp-overlay-wrap" v-show="visible" @click="close"></div>

    <aside
      class="sp-side-menu-wrap"
      v-show="visible"
      role="dialog"
      aria-label="モバイルメニュー"
    >
      <header class="sp-section-header-wrap">
        <span>マイメニュー</span>
      </header>

      <nav class="sp-menu-list-wrap" @click="close">
        <router-link to="/home" class="sp-menu-item-wrap" @click="close">
          <img
            class="sp-menu-icon"
            src="/dashBordPinkIcon.svg"
            alt="ダッシュボードアイコン"
          />
          <span>ダッシュボード</span>
        </router-link>

        <router-link to="/home" class="sp-menu-item-wrap" @click="close">
          <img
            class="sp-menu-icon"
            src="/employeeListPinkIcon.svg"
            alt="従業員一覧アイコン"
          />
          <span>従業員一覧</span>
        </router-link>
      </nav>

      <header class="sp-section-header-wrap">
        <span>その他</span>
      </header>

      <nav class="sp-menu-list-wrap">
        <router-link
          to="/login"
          class="sp-sub-menu-item-wrap"
          @click="onLogout"
        >
          <img
            class="sp-menu-icon"
            src="/logoutBlueIcon.svg"
            alt="ログアウトアイコン"
          />
          <span>ログアウト</span>
        </router-link>

        <router-link
          to="/register"
          class="sp-sub-menu-item-wrap"
          @click="close"
        >
          従業員登録
        </router-link>

        <router-link
          :to="{ name: 'EmployeeDetail', params: { id: 1 } }"
          class="sp-sub-menu-item-wrap"
          @click="close"
        >
          従業員詳細
        </router-link>

        <router-link
          :to="{ name: 'EmployeeEdit', params: { id: 1 } }"
          class="sp-sub-menu-item-wrap"
          @click="close"
        >
          従業員編集
        </router-link>
      </nav>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../../stores/auth'

const authStore = useAuthStore()
const props = defineProps<{ visible: boolean }>()

const emit = defineEmits(['close'])

/** サイドメニューを閉じる */
const close = () => emit('close')

/** ログアウト */
const onLogout = () => {
  authStore.logout()
  close()
}
</script>

<style scoped>
.sp-overlay-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: var(--app-header-height, 100px);
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9998;
}

.sp-side-menu-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: var(--app-header-height, 100px);
  height: calc(100vh - var(--app-header-height, 100px));
  width: 100%;
  background: #fff;
  z-index: 9999;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  padding: 10px 15%;
}

.sp-section-header-wrap {
  align-self: flex-start;
  font-size: 10px;
  font-weight: 700;
  margin-top: 30px;
}

.sp-menu-list-wrap {
  text-decoration: none;
  font-size: 14px;
  width: 100%;
}

.sp-menu-item-wrap {
  width: 100%;
  height: 40px;
  border: 1px solid #de2583;
  border-radius: 3px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  color: #de2583;
  padding: 0 20px;
}

.sp-menu-item-wrap:first-child {
  margin-top: 15px;
}

.sp-sub-menu-item-wrap {
  width: 100%;
  height: 40px;
  border: 1px solid #0d2b81;
  border-radius: 3px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  color: #0d2b81;
  padding: 0 20px;
}

.sp-sub-menu-item-wrap:first-child {
  margin-top: 15px;
}

.sp-menu-icon {
  width: 24px;
  height: 24px;
  margin-right: 15px;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}
</style>
