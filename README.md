# AttendanceSystemForApril

Vue 3 + TypeScript + Vite をベースにしたフロントエンド環境です。

このリポジトリでは、以下の機能を組み込んでいます。

- SCSS
- Pinia
- Element Plus
- Supabase

## 前提

この README は、既存のリポジトリを clone / pull して使う前提です。

ゼロから同じ構成を作る手順や、GitHub / Supabase の詳細な構築手順は `SETUP_GUIDE.md` を参照してください。

## セットアップ

依存パッケージをインストールします。

```powershell
npm install
```

開発サーバーを起動します。

```powershell
npm run dev
```

ブラウザで表示されたローカル URL を開きます。

例:

```text
http://localhost:5173/
```

## 環境変数

Supabase 接続情報は `.env` に設定します。

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-publishable-key
```

`VITE_SUPABASE_ANON_KEY` には Supabase の publishable key を使います。

Secret key や service role key はフロントエンドの `.env` に設定しません。

## 利用コマンド

```powershell
npm run dev
npm run build
npm run preview
npm run typecheck
```

各コマンドの役割は以下です。

- `npm run dev`: 開発用サーバーを起動する
- `npm run build`: 型チェック後、本番用ファイルを `dist/` に作成する
- `npm run preview`: `dist/` の本番用ビルドをローカルで確認する
- `npm run typecheck`: TypeScript / Vue の型チェックだけを実行する

## 動作確認

### Pinia

画面の `カウント` ボタンをクリックします。

クリックするたびに数字が増えれば、Pinia の状態管理が機能しています。

### Element Plus

画面上のボタン、タグ、アラートは Element Plus のコンポーネントです。

以下が表示されていれば、Element Plus は機能しています。

- `カウント` ボタン
- `Pinia 有効` タグ
- `Check users` ボタン
- `users table` のアラート

### SCSS

画面に以下のスタイルが反映されていれば、SCSS は機能しています。

- 背景のグラデーション
- 中央パネルの余白、角丸、影
- カードの3列表示
- 画面幅を狭くしたときの1列表示

### Supabase

`Check users` ボタンをクリックします。

以下のように表示されれば、Supabase の `users` テーブルを読み取れています。

```text
users table: HTTP 200 OK / users rows: 1
```

取得した `users` の中身は、ブラウザの DevTools Console に出力されます。

```text
Supabase users sample: [...]
```

## ファイル構成

主なファイルは以下です。

- `src/App.vue`: 画面本体
- `src/main.ts`: Vue / Pinia / Element Plus / SCSS の読み込み
- `src/views/`: ページ単位の Vue コンポーネント
- `src/router/`: Vue Router の設定
- `src/components/`: 再利用コンポーネント
- `src/model/`: 型定義、データモデル
- `src/services/`: API 通信や外部サービス連携
- `src/stores/counter.ts`: Pinia のカウント状態管理
- `src/styles/main.scss`: 画面全体の SCSS
- `src/styles/_variables.scss`: SCSS 変数
- `src/supabase/client.ts`: Supabase クライアント
- `src/services/supabaseHealth.ts`: Supabase 接続確認

## 補足

この README は「既存リポジトリを使う人向け」の説明です。

初期構築の背景、ゼロからの作成手順、運用ルールは `SETUP_GUIDE.md` に分けています。
