<!-- ヘッダーコンポーネント PC用： AppHeaderDesktop.vue -->
<template>
  <header class="pc-header">
    <div class="pc-header-wrap">
      <div class="pc-brand-wrap">
        <img class="pc-logo" src="/logo.svg" alt="ロゴ" />
      </div>
      <nav class="pc-nav-wrap" aria-label="メインナビ">
        <div
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
          <div>伊地智 明佳</div>
        </div>
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
  box-shadow: -1px 0 0 0 #fff;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  height: 100%;
  cursor: pointer;
  font-weight: 700;
  position: relative;
}

.pc-nav-item:hover {
  background: #fff;
  border: 6px solid #0d2b81;
  color: #0d2b81;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  height: 100%;
  cursor: pointer;
  font-weight: 700;
}

.pc-profile-img {
  width: 55px;
  height: 55px;
}

.pc-menu-img {
  width: 48px;
  height: 48px;
}
</style>
