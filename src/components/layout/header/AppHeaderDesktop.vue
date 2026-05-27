<!-- ヘッダーコンポーネント PC用： AppHeaderDesktop.vue -->
<template>
  <header class="pc-header">
    <div class="pc-header-wrap">
      <div class="pc-brand-wrap">
        <img class="pc-logo" src="/logo.svg" alt="ロゴ" />
      </div>
      <nav
        v-if="authStore.isAuthenticated"
        class="pc-nav-wrap"
        aria-label="メインナビ"
      >
        <router-link
          :to="{ name: 'EmployeeDetail', params: { id: 1 } }"
          class="pc-nav-item"
          @mouseenter="isProfeelHover = true"
          @mouseleave="isProfeelHover = false"
        >
          <img
            class="pc-profile-img"
            :src="
              isProfeelHover
                ? '/profeelBearBlueIcon.svg'
                : '/profeelBearWhiteIcon.svg'
            "
            alt="プロフィールアイコン"
          />
          <div
            class="pc-user-name"
            :style="getUserNameStyle(authStore.user?.userName)"
          >
            {{ authStore.user?.userName }}
          </div>
        </router-link>
        <div
          class="pc-nav-item"
          @mouseenter="isMenuHover = true"
          @mouseleave="isMenuHover = false"
          @click="toggleSide"
        >
          <img
            class="pc-menu-img"
            :src="
              isMenuHover ? '/menuIceBlueIcon.svg' : '/menuIceWhiteIcon.svg'
            "
            alt="メニューアイコン"
          />
          <div>MENU</div>
        </div>
      </nav>
    </div>
    <AppSideMenuDesktop :visible="sideVisible" @close="sideVisible = false" />
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppSideMenuDesktop from '../sideMenu/AppSideMenuDesktop.vue'
import { useAuthStore } from '../../../stores/auth'

const authStore = useAuthStore()

/** サイドメニューの表示・非表示*/
const sideVisible = ref(false),
  toggleSide = () => (sideVisible.value = !sideVisible.value)

/** ルート変更時にサイドメニューを閉じる */
const route = useRoute()
watch(
  () => route.fullPath,
  () => {
    sideVisible.value = false
  },
)

/** プロフィールアイコンのホバー状態を管理 */
const isProfeelHover = ref(false)

/** メニューアイコンのホバー状態を管理 */
const isMenuHover = ref(false)

/**
 * ログイン者名文字サイズ制御
 * 18px基準 / 最小7px
 */
const getUserNameStyle = (userName?: string) => {
  if (!userName) {
    return {}
  }
  /** 基本18px */
  let fontSize = 18
  /** 文字数に応じて縮小 */
  if (userName.length > 10) {
    fontSize = 18 - (userName.length - 10) * 0.3
  }
  return {
    fontSize: `${Math.max(fontSize, 7)}px`,
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/ijichi.scss';

.pc-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--app-header-height, 100px);
  background: #de2583;
  border-bottom: 1px solid #eee;
  z-index: 10010;
  display: flex;
  align-items: center;
}

.pc-header-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  box-sizing: border-box;
}

.pc-brand-wrap {
  height: 65px;
  width: 200px;
  overflow: hidden;
}

.pc-logo {
  height: 200px;
  width: 100%;
  display: block;
  transform: translateY(-68px);
}

.pc-nav-wrap {
  display: flex;
  align-items: center;
  height: 100%;
}

.pc-nav-item {
  background: #0d2b81;
  border: 6px solid transparent;
  box-shadow: -1px 0 0 0 #fff;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  font-weight: 700;
  position: relative;
  width: 200px;
  min-width: 200px;
  max-width: 200px;
  box-sizing: border-box;
}

.pc-nav-item:hover {
  background: #fff;
  border: 6px solid #0d2b81;
  color: #0d2b81;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  font-weight: 700;
  width: 200px;
  min-width: 200px;
  max-width: 200px;
  box-sizing: border-box;
}

.pc-profile-img {
  width: 55px;
  height: 55px;
}

.pc-menu-img {
  width: 48px;
  height: 48px;
}

.pc-user-name {
  width: 100%;
  padding: 0 8px;
  text-align: center;
  line-height: 1.2;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
}
</style>
