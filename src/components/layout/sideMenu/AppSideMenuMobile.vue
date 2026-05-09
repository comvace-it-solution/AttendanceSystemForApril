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

      <nav class="sp-menu-list-wrap">
        <div class="sp-menu-item-wrap">
          <img
            class="sp-menu-icon"
            src="/dashBordPinkIcon.svg"
            alt="ダッシュボードアイコン"
          />
          <router-link to="/home">ダッシュボード</router-link>
        </div>

        <div class="sp-menu-item-wrap">
          <img
            class="sp-menu-icon"
            src="/employeeListPinkIcon.svg"
            alt="従業員一覧アイコン"
          />
          <router-link to="/home">従業員一覧</router-link>
        </div>
      </nav>

      <header class="sp-section-header-wrap">
        <span>その他</span>
      </header>

      <nav class="sp-menu-list-wrap">
        <div class="sp-sub-menu-item-wrap">
          <img
            class="sp-menu-icon"
            src="/logoutBlueIcon.svg"
            alt="ログアウトアイコン"
          />
          <router-link to="/home">ログアウト</router-link>
        </div>

        <div class="sp-sub-menu-item-wrap">
          <router-link to="/home">従業員登録</router-link>
        </div>

        <div class="sp-sub-menu-item-wrap">
          <router-link to="/home">従業員詳細</router-link>
        </div>
      </nav>
    </aside>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ visible: boolean }>()

const emit = defineEmits(['close'])

/** サイドメニューを閉じる */
const close = () => emit('close')
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
  padding: 10px 20%;
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
