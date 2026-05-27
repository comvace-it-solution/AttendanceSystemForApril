<template>
  <transition name="fade">
    <div class="pc-overlay-wrap" v-show="visible" @click="close"></div>
  </transition>

  <transition name="slide-right">
    <aside
      class="pc-side-menu-wrap"
      v-show="visible"
      role="dialog"
      aria-label="サイドメニュー"
    >
      <div class="pc-header-wrap">
        <div class="pc-header-item-wrap">
          <button class="pc-close-button" @click="close" aria-label="閉じる">
            <span class="pc-close-icon" aria-hidden="true">
              <span class="pc-close-bar bar1"></span>
              <span class="pc-close-bar bar2"></span>
            </span>
          </button>
        </div>
        <router-link to="/login" class="pc-header-item-wrap" @click="onLogout">
          <img
            class="pc-header-icon"
            src="/logoutBlueIcon.svg"
            alt="ログアウトアイコン"
          />
          <div class="pc-header-text">ログアウト</div>
        </router-link>
        <router-link
          :to="{ name: 'EmployeeDetail', params: { id: 1 } }"
          class="pc-header-item-wrap"
          @click="close"
        >
          <img
            class="pc-header-icon"
            src="/profeelBearBlueIcon.svg"
            alt="マイページアイコン"
          />
          <div class="pc-header-text">マイページ</div>
        </router-link>
      </div>

      <div class="pc-user-wrap">
        <div class="pc-user-name-text">{{ authStore.user?.userName }}</div>
        <span class="pc-user-suffix-text">さん</span>
      </div>

      <div class="pc-menu-wrap">
        <header class="pc-section-header-wrap">
          <span>マイメニュー</span>
        </header>

        <nav class="pc-menu-list-wrap">
          <router-link to="/home" class="pc-menu-item-wrap" @click="close">
            <img
              class="pc-menu-icon"
              src="/dashBordPinkIcon.svg"
              alt="ダッシュボードアイコン"
            />
            <span>ダッシュボード</span>
          </router-link>

          <router-link to="/home" class="pc-menu-item-wrap" @click="close">
            <img
              class="pc-menu-icon"
              src="/employeeListPinkIcon.svg"
              alt="従業員一覧アイコン"
            />
            <span>従業員一覧</span>
          </router-link>
        </nav>

        <!-- <header class="pc-section-header-wrap">
          <span>その他</span>
        </header> -->

        <nav class="pc-menu-list-wrap">
          <!-- <router-link
            to="/register"
            class="pc-sub-menu-item-wrap"
            @click="close"
          >
            <span>従業員登録</span>
          </router-link> -->

          <!-- <router-link
            :to="{ name: 'EmployeeDetail', params: { id: 1 } }"
            class="pc-sub-menu-item-wrap"
            @click="close"
          >
            <span>従業員詳細</span>
          </router-link> -->

          <!-- <router-link
            :to="{ name: 'EmployeeEdit', params: { id: 1 } }"
            class="pc-sub-menu-item-wrap"
            @click="close"
          >
            <span>従業員編集</span>
          </router-link> -->
        </nav>
      </div>
    </aside>
  </transition>
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
.pc-overlay-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 20001;
}

.pc-side-menu-wrap {
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 320px;
  background: #ffffff;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.16);
  z-index: 20002;
  display: flex;
  flex-direction: column;
}

.pc-header-wrap {
  display: flex;
  align-items: center;
  padding: 30px 20px;
}

.pc-header-item-wrap {
  width: 40px;
  height: 40px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.pc-close-button {
  background: transparent;
  border: none;
  padding: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.pc-close-icon {
  position: relative;
  width: 38px;
  height: 38px;
  display: inline-block;
}

.pc-close-bar {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 38px;
  height: 2px;
  background: #333;
  transform-origin: center;
  transform: translate(-50%, -50%);
}

.pc-close-bar.bar1 {
  transform: translate(-50%, -50%) rotate(45deg);
}
.pc-close-bar.bar2 {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.pc-header-text {
  font-size: 8px;
  font-weight: 700;
}

.pc-user-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 50px;
  background: #de2583;
  color: #fff;
  font-weight: 700;
  padding: 18px;
  flex-wrap: wrap;
}

.pc-user-name-text {
  margin-right: 8px;
  font-size: 16px;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.pc-user-suffix-text {
  margin-top: 3px;
  font-size: 12px;
  flex-shrink: 0;
}

.pc-menu-wrap {
  padding: 0 18px;
}

.pc-section-header-wrap {
  align-self: flex-start;
  font-size: 10px;
  font-weight: 700;
  margin-top: 30px;
}

.pc-menu-list-wrap {
  font-size: 14px;
  width: 100%;
}

.pc-menu-item-wrap {
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

.pc-menu-item-wrap:first-child {
  margin-top: 15px;
}

.pc-sub-menu-item-wrap {
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

.pc-sub-menu-item-wrap:first-child {
  margin-top: 15px;
}

.pc-header-icon {
  width: 30px;
  height: 30px;
}

.pc-menu-icon {
  width: 24px;
  height: 24px;
  margin-right: 15px;
}
</style>
