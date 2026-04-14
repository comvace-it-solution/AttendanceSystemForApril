<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCounterStore } from './stores/counter'
import { checkSupabaseRestApi, getSupabaseSessionState } from './services/supabaseHealth'

const counterStore = useCounterStore()

type Status = 'idle' | 'success' | 'error'

const isCheckingRest = ref(false)
const isCheckingSession = ref(false)
const restStatus = ref<Status>('idle')
const restMessage = ref('未確認')
const sessionStatus = ref<Status>('idle')
const sessionMessage = ref('未確認')
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseProjectRef = new URL(supabaseUrl).hostname.split('.')[0]

const toAlertType = (status: Status) => {
  if (status === 'success') {
    return 'success'
  }

  if (status === 'error') {
    return 'danger'
  }

  return 'info'
}

const restStatusType = computed(() => toAlertType(restStatus.value))
const sessionStatusType = computed(() => toAlertType(sessionStatus.value))

const incrementCounter = () => {
  counterStore.increment()
}

const checkSupabaseRest = async () => {
  isCheckingRest.value = true
  restStatus.value = 'idle'
  restMessage.value = '確認中...'

  try {
    const result = await checkSupabaseRestApi()
    restStatus.value = result.ok ? 'success' : 'error'
    restMessage.value = result.message
  } catch (error) {
    restStatus.value = 'error'
    restMessage.value =
      error instanceof Error ? error.message : 'Supabase への接続確認に失敗しました。'
  } finally {
    isCheckingRest.value = false
  }
}

const checkSupabaseSession = async () => {
  isCheckingSession.value = true
  sessionStatus.value = 'idle'
  sessionMessage.value = '確認中...'

  try {
    const result = await getSupabaseSessionState()
    sessionStatus.value = result.ok ? 'success' : 'error'
    sessionMessage.value = result.message
  } catch (error) {
    sessionStatus.value = 'error'
    sessionMessage.value =
      error instanceof Error ? error.message : 'Supabase セッション確認に失敗しました。'
  } finally {
    isCheckingSession.value = false
  }
}
</script>

<template>
  <main class="app-shell">
    <section class="hero-panel">
      <p class="eyebrow">Environment Setup</p>
      <h1>Vue 3 Frontend Starter</h1>
      <p class="lead">
        TypeScript、Vite、Pinia、Element Plus、Supabase を組み込んだ初期構成です。
      </p>

      <div class="action-row">
        <el-button type="primary" size="large" @click="incrementCounter">
          カウント: {{ counterStore.count }}
        </el-button>
        <el-tag type="success" size="large">Pinia 有効</el-tag>
        <el-tag type="info" size="large">プロジェクト: {{ supabaseProjectRef }}</el-tag>
        <el-button
          plain
          size="large"
          :loading="isCheckingRest"
          @click="checkSupabaseRest()"
        >
          Check users
        </el-button>
        <el-button
          plain
          size="large"
          :loading="isCheckingSession"
          @click="checkSupabaseSession()"
        >
          Check Auth Session
        </el-button>
      </div>

      <el-alert
        class="connection-alert"
        :title="`users table: ${restMessage}`"
        :type="restStatusType"
        :closable="false"
        show-icon
      />
      <el-alert
        class="connection-alert"
        :title="`Auth Session: ${sessionMessage}`"
        :type="sessionStatusType"
        :closable="false"
        show-icon
      />
    </section>

    <section class="status-grid">
      <article class="status-card">
        <h2>State Management</h2>
        <p>Pinia ストアは `src/stores/` に配置します。</p>
      </article>
      <article class="status-card">
        <h2>Styling</h2>
        <p>共通スタイルと変数は `src/styles/` で管理します。</p>
      </article>
      <article class="status-card">
        <h2>Supabase</h2>
        <p>クライアントは `src/supabase/client.ts`、疎通確認は `src/services/` から利用します。</p>
      </article>
    </section>
  </main>
</template>
