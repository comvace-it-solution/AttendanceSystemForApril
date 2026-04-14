# environment-setup

Vue 3 + TypeScript + Vite をベースに、以下を組み込んだフロントエンド開発環境です。

- SCSS
- Pinia
- Element Plus
- Supabase

## セットアップ

```powershell
npm install
npm run dev
```

## 環境変数

`.env` に Supabase 接続情報を設定済みです。

```env
VITE_SUPABASE_URL=https://fxeffanglrojuuadtbso.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_1bmhq_xC-5W03DFiiMPKKw_5S5oRxwp
```

`VITE_SUPABASE_ANON_KEY` には Supabase の Publishable key を使用します。Secret key はフロントエンドに設定しません。

## 利用可能なコマンド

```powershell
npm run dev
npm run build
npm run preview
npm run typecheck
```

## 接続確認

`npm run dev` で起動後、画面上の以下ボタンで Supabase 接続を確認できます。

- `Check REST API`: `users` テーブルへの HTTP 読み取り確認
- `Check Auth Session`: Supabase SDK 経由のセッション確認
