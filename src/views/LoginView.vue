<script setup lang="ts">
import { useAuth } from '../composables/useAuth.ts'
import { useRouter } from 'vue-router'
import { Message, Lock } from '@element-plus/icons-vue'

const { form, emailError, passwordError, loginError, validateEmail, validatePassword, isLoginDisabled, onLogin } = useAuth()
const router = useRouter()

// ログインフォームの送信処理
// テスト用ページに遷移で記載（マージ後はダッシュボード遷移へ変更する）
const onLoginSubmit = async () => { 
  try {
    await onLogin()
        router.push('/home')
  } catch (error) {
    console.error("Login failed in component", error)
  }
}
</script>

<template>
    <div class="login-container">
      <div class="login-side-wrapper">
        <img class="login-logo" src="@/assets/LoginLogo.png" alt="ログインロゴ"/>
      </div>
      <div class="login-side-wrapper">
        <div class="login-card">
          <form class="login-form" @submit.prevent="onLoginSubmit">
            <p v-if="loginError" class="login-error-msg">{{ loginError }}</p>
            <div class="login-input-group">
              <el-input 
                v-model="form.email" 
                type="email" 
                id="email" 
                @blur="validateEmail" 
                :class="{ 'is-invalid': emailError }" 
                placeholder="email" 
                required >
                <template #prefix>
                  <el-icon class="el-input__icon"><Message /></el-icon>
                </template>
              </el-input>
              <p v-if="emailError" class="input-error-msg">{{ emailError }}</p>
            </div>
            <div class="login-input-group">
              <el-input 
                v-model="form.password" 
                type="password" 
                id="password" 
                @blur="validatePassword" 
                :class="{ 'is-invalid': passwordError }" placeholder="password" 
                required >
                <template #prefix>
                  <el-icon class="el-input__icon"><Lock /></el-icon>
                </template>
              </el-input>
              <p v-if="passwordError" class="input-error-msg">{{ passwordError }}</p>
            </div>
            <div class="login-submit-container">
              <button type="submit" :disabled="isLoginDisabled" >login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
@use "@/styles/kanda.scss" as *;


.login-container {
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;

  @include sp {
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 40px;
  }

  .login-side-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0; 

    @include sp {
      flex: none;
      width: 100%;
      margin-bottom: 20px;
    }
  }
}

.login-card {
  width: 80%;
  max-width: 400px;
  margin: 20px auto;
  padding: 104px 10%;
  border-radius: 40px;
  background-color: #FFF9FD;
  text-align: center;
}

.login-form {
width: 100%;
position: relative;

    .login-error-msg {
    position: absolute;
    top: -40px;
    left: 0;
    width: 100%;
    color: $text-error;
    font-size: $fs-error;
    margin: 0;
    text-align: left;
  }

  .login-input-group {
    position: relative;
    margin-bottom: 75px;

    :deep(.el-input__inner) {
      font-size: $fs-input;
      color: $text-color;

      &::placeholder {
        font-size: $fs-input;
        color: #D9D9D9;
      }
    }

    :deep(.el-input__prefix-inner) {
      .el-icon {
        font-size: $fs-body;
        color: $text-color;
      }
    }

    :deep(.el-input__wrapper) {
      background-color: transparent !important;
      box-shadow: none !important;
      border-bottom: 1.5px solid $text-color;
      border-radius: 0;
      padding: 0;
    }

    .input-error-msg {
      position: absolute;
      top: 100%;
      left: 0;
      color: $text-error;
      font-size: $fs-error;
      margin: 0;
      text-align: left;
    }
  }

  .login-submit-container {
    width: 90%;
    max-width: 210px;
    height: 60px;
    margin: 0 auto;

    button {
        background-color: $text-color;
        color: #FFFFFF;
      
      &:disabled {
        background-color: #FFF9FD;
        border: solid 2px $text-color;
        color: $text-color;
      }
    }
  }
}
</style>
