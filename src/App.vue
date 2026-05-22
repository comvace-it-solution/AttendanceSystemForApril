<template>
  <RouterView />
  <!-- <main class="app-shell">
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
        <el-tag type="warning" size="large">
          最終クリック: {{ counterStore.lastClickedAt || '未クリック' }}
        </el-tag>
        <el-tag type="info" size="large">プロジェクト: {{ supabaseProjectRef }}</el-tag>
        <el-button
          plain
          size="large"
          :loading="isCheckingRest"
          @click="checkSupabaseRest()"
        >
          Check users
        </el-button>
      </div>

      <el-alert
        class="connection-alert"
        :title="`users table: ${restMessage}`"
        :type="restStatusType"
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
  </main> -->
</template>
