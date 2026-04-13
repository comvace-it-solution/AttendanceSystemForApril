# environment-setup

Vue 3 + TypeScript + Vite をベースに、以下を組み込んだフロントエンド開発環境です。

- SCSS
- Pinia
- Element Plus
- Supabase

## セットアップ

```powershell
npm install
cp .env.example .env
npm run dev
```

## 環境変数

`.env` に以下を設定します。

```env
VITE_SUPABASE_URL=https://fxeffanglrojuuadtbso.supabase.co
VITE_SUPABASE_ANON_KEY=please-set-from-supabase-dashboard
```

`VITE_SUPABASE_ANON_KEY` は Supabase ダッシュボードの `Connect` または `Project Settings > Data API` から取得します。

## 利用可能なコマンド

```powershell
npm run dev
npm run build
npm run preview
npm run typecheck
```

## 接続確認

`npm run dev` で起動後、画面上の以下ボタンで Supabase 接続を確認できます。

- `Check REST API`: Data API への HTTP 到達確認
- `Check Auth Session`: Supabase SDK 経由のセッション確認
