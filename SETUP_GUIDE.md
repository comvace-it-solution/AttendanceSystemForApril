# Vue 3 + TypeScript 開発環境 手順書

## 1. 目的

以下の技術要件を満たしたフロントエンド開発環境を構築し、GitHub 上でブランチ運用とプルリクレビューを前提に開発を進める。

想定する配置先:

- GitHub Organization: `https://github.com/comvace-it-solution`
- この Organization 配下に本案件用の新規リポジトリを作成する
- 本手順書では推奨リポジトリ名を `environment-setup` として記載する
- 接続先 Supabase プロジェクト: `comvace_simulated_project`
- Supabase Project URL: `https://fxeffanglrojuuadtbso.supabase.co`

- 言語: TypeScript
- フレームワーク: Vue.js 3
- スタイル: SCSS
- ビルドツール: Vite
- 状態管理: Pinia
- UI コンポーネント: Element Plus
- ソース管理: GitHub
- データ管理: Supabase

## 2. 前提条件

作業開始前に以下を準備する。

- Node.js 20 LTS 以上
- npm 10 以上
- Git
- GitHub アカウント
- Supabase アカウント
- Visual Studio Code などのエディタ

バージョン確認:

```powershell
node -v
npm -v
git --version
```

## 3. プロジェクト作成

### 3.1 Vite + Vue 3 + TypeScript の初期化

```powershell
npm create vite@latest environment-setup -- --template vue-ts
cd environment-setup
```

### 3.2 パッケージインストール

```powershell
npm install
npm install pinia element-plus @element-plus/icons-vue @supabase/supabase-js
npm install -D sass
```

### 3.3 開発サーバ起動

```powershell
npm run dev
```

## 4. 推奨ディレクトリ構成

```text
environment-setup/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  ├─ composables/
│  ├─ layouts/
│  ├─ router/
│  ├─ stores/
│  ├─ styles/
│  │  ├─ _variables.scss
│  │  ├─ _mixins.scss
│  │  └─ main.scss
│  ├─ supabase/
│  │  └─ client.ts
│  ├─ views/
│  ├─ App.vue
│  └─ main.ts
├─ .env
├─ .env.example
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

## 5. 初期設定

### 5.1 `main.ts` の設定

Pinia と Element Plus を組み込む。

```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/main.scss'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.mount('#app')
```

### 5.2 SCSS の共通管理

`src/styles/main.scss` を作成し、共通変数や全体スタイルを管理する。

```scss
@use './variables' as *;

body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background: #f5f7fa;
  color: #1f2937;
}
```

### 5.3 Supabase クライアント作成

`src/supabase/client.ts`

```ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

`.env.example`

```env
VITE_SUPABASE_URL=https://fxeffanglrojuuadtbso.supabase.co
VITE_SUPABASE_ANON_KEY=please-set-from-supabase-dashboard
```

`VITE_SUPABASE_ANON_KEY` は Supabase ダッシュボードの `Connect` または `Project Settings > Data API` から取得する。

## 6. 状態管理方針

- グローバルに共有する状態は Pinia で管理する
- API レスポンスのキャッシュやユーザー情報、画面横断の UI 状態を `stores/` に集約する
- 一時的で局所的な状態は各コンポーネント内で管理する

Pinia ストア例:

```ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userName = ref('')

  const setUserName = (value: string) => {
    userName.value = value
  }

  return {
    userName,
    setUserName,
  }
})
```

## 7. UI 実装方針

- 共通 UI は Element Plus をベースに構築する
- 画面固有の見た目調整は SCSS で上書きする
- デザイン変数は `src/styles/_variables.scss` に集約する
- 独自コンポーネントと Element Plus コンポーネントの責務を分離する

## 8. GitHub 運用ルール

### 8.1 リポジトリ作成

1. GitHub Organization `comvace-it-solution` 配下で新規リポジトリを作成する
2. ローカルで Git を初期化する
3. `main` ブランチを保護対象に設定する

命名規則:

- すべて小文字の kebab-case を使用する
- リポジトリ名で用途が分かる名前にする
- 環境構築専用リポジトリの場合はセットアップ用途を明示する

推奨名:

- `environment-setup`

用途別の命名例:

- `environment-setup`
- `frontend-environment-setup`
- `vue3-environment-setup`

```powershell
git init
git branch -M main
git remote add origin https://github.com/comvace-it-solution/environment-setup.git
```

補足:

- 環境構築専用で使うなら `environment-setup` が最も分かりやすい
- 今後フロントエンド実装用リポジトリを別で作る場合は、実装側だけ `*-frontend` 命名に分離すると整理しやすい

### 8.2 ブランチ運用

- `main`: 本番反映対象
- `develop`: 開発統合用
- `feature/*`: 機能開発用
- `fix/*`: 不具合修正用

ブランチ作成例:

```powershell
git checkout -b develop
git checkout -b feature/login-page
```

### 8.3 プルリクレビュー

- `main` への直接 push は禁止
- 開発は `feature/*` または `fix/*` で実施
- `develop` または `main` へのマージは Pull Request 経由で実施
- 最低 1 名のレビュー承認を必須にする
- CI がある場合は成功をマージ条件に含める

### 8.4 初回 push

```powershell
git add .
git commit -m "chore: initialize project"
git push -u origin main
```

## 9. Supabase 利用方針

- 接続情報は `.env` で管理し、機密情報は Git に含めない
- `.env.example` のみコミットする
- 認証、データ取得、更新処理は `supabase/` または `services/` に分離する
- テーブル設計、RLS、認証設定は Supabase コンソール側で管理する
- 現在の接続先は `comvace_simulated_project` (`fxeffanglrojuuadtbso`) を利用する

`.gitignore` に含める項目:

```gitignore
node_modules/
dist/
.env
.DS_Store
```

## 10. 推奨追加設定

必要に応じて以下も導入する。

- Vue Router
- ESLint
- Prettier
- Husky
- lint-staged
- GitHub Actions

導入例:

```powershell
npm install vue-router
npm install -D eslint prettier
```

## 11. 開発開始までの最短手順

1. Node.js と Git をインストールする
2. Vite で Vue 3 + TypeScript プロジェクトを作成する
3. Pinia、Element Plus、Supabase、sass を追加する
4. `.env` を設定する
5. GitHub リポジトリを作成し、`main` と `develop` 運用を開始する
6. Pull Request ベースの開発フローを徹底する

## 12. 納品時に満たすべき状態

- Vue 3 + TypeScript + Vite 環境が起動できる
- SCSS が利用できる
- Pinia が組み込まれている
- Element Plus が利用できる
- Supabase クライアントが接続可能な状態になっている
- GitHub リポジトリでブランチ運用とレビュー運用ができる
