<template>
  <header class="sp-app-header-mobile">
    <div class="sp-container">
      <div class="sp-hamburger-wrap">
        <button
          v-if="authStore.isAuthenticated"
          class="sp-hamburger"
          :class="{ open: sideVisible }"
          @click="toggleSide"
          aria-label="メニュー"
          :aria-expanded="sideVisible"
        >
          <span class="sp-hamburger-box"
            ><span class="sp-hamburger-inner"></span
          ></span>
        </button>
      </div>
      <div class="sp-logo-wrap">
        <img class="sp-logo" src="/logo.svg" alt="ロゴ" />
      </div>
      <router-link
        v-if="userId"
        :to="{ name: 'EmployeeDetail', params: { id: userId } }"
        class="sp-profile-wrap"
        @click="closeSide"
      >
        <img
          class="sp-profeel-icon"
          src="/profeelBearWhiteIcon.svg"
          alt="プロフィールアイコン"
        />
        <div
          class="sp-user-name"
          :style="getSpUserNameStyle(authStore.user?.userName)"
        >
          {{ authStore.user?.userName }}
        </div>
      </router-link>
    </div>
    <AppSideMenuMobile :visible="sideVisible" @close="sideVisible = false" />
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppSideMenuMobile from '../sideMenu/AppSideMenuMobile.vue'
import { useAuthStore } from '../../../stores/auth'

const authStore = useAuthStore()

const userId = computed(() => authStore.user?.userId ?? '')

const sideVisible = ref(false)
const toggleSide = () => {
  sideVisible.value = !sideVisible.value
}
const closeSide = () => {
  sideVisible.value = false
}
/** SPログイン者名文字サイズ */
const getSpUserNameStyle = (userName?: string) => {
  if (!userName) {
    return {}
  }

  const fontSize =
    userName.length > 10 ? 10 - (userName.length - 10) * 0.15 : 10

  return {
    fontSize: `${Math.max(fontSize, 6)}px`,
  }
}
</script>

<style scoped>
.sp-app-header-mobile {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--app-header-height, 100px);
  padding: 0 8px 8px 10px;
  background: #de2583;
  z-index: 10010;
  box-sizing: border-box;
}
.sp-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  position: relative;
}

.sp-hamburger-wrap {
  width: 30px;
  height: 30px;
}

.sp-hamburger {
  background: transparent;
  border: none;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.sp-hamburger-box {
  width: 28px;
  height: 17px;
  display: inline-block;
  position: relative;
}
.sp-hamburger-inner,
.sp-hamburger-inner::before,
.sp-hamburger-inner::after {
  height: 3px;
  background-color: #fff;
  position: absolute;
  left: 0;
  transition:
    transform 220ms ease,
    opacity 220ms ease;
}

.sp-hamburger-inner {
  width: 22px;
  top: 50%;
  transform: translateY(-50%);
}

.sp-hamburger-inner::before {
  content: '';
  width: 28px;
  top: 50%;
  transform: translateY(calc(-50% - 7px));
}

.sp-hamburger-inner::after {
  content: '';
  width: 17px;
  top: 50%;
  transform: translateY(calc(-50% + 7px));
}

.sp-hamburger-box::before,
.sp-hamburger-box::after {
  content: '';
  position: absolute;
  height: 2px;
  width: 29px;
  left: calc((100% - 29px) / 2);
  top: 50%;
  background: #fff;
  opacity: 0;
  transform-origin: center;
  transition:
    transform 220ms ease,
    opacity 220ms ease;
}
.sp-hamburger-box::before {
  transform: translateY(-50%) rotate(45deg);
}
.sp-hamburger-box::after {
  transform: translateY(-50%) rotate(-45deg);
}

.sp-hamburger.open .sp-hamburger-inner,
.sp-hamburger.open .sp-hamburger-inner::before,
.sp-hamburger.open .sp-hamburger-inner::after {
  opacity: 0;
}
.sp-hamburger.open .sp-hamburger-box::before,
.sp-hamburger.open .sp-hamburger-box::after {
  opacity: 1;
}

.sp-logo-wrap {
  height: 33px;
  width: 110px;
  overflow: hidden;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.sp-logo {
  height: 101px;
  width: 100%;
  display: block;
  transform: translateY(-34px);
}

.sp-profile-wrap {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  max-width: 100px;
  min-width: 100px;
  height: 30px;
  cursor: pointer;
  position: relative;
  font-weight: 700;
}

.sp-user-name {
  width: 100%;
  overflow: hidden;
  word-break: break-word;
  overflow-wrap: anywhere;
  line-height: 1.1;
  text-align: center;
}

.sp-profeel-icon {
  width: 25px;
  height: 25px;
  margin-right: 8px;
}
</style>
