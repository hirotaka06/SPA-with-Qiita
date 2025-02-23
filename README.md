<div id="top"></div>

# 🚀 使用技術一覧

<!-- シールド一覧 -->
<p style="display: inline">
  <img src="https://img.shields.io/badge/-TypeScript-3178C6.svg?logo=typescript&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/-Vite-646CFF.svg?logo=vite&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React%20Router-CA4245.svg?logo=react-router&style=for-the-badge">
  <img src="https://img.shields.io/badge/-TailwindCSS-38B2AC.svg?logo=tailwindcss&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Vitest-6E4C13.svg?logo=vitest&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Storybook-FF4785.svg?logo=storybook&style=for-the-badge">
  <img src="https://img.shields.io/badge/-shadcnui-FF5733.svg?logo=shadcnui&style=for-the-badge">
  <img src="https://img.shields.io/badge/-GitHub%20Actions-2088FF.svg?logo=github-actions&style=for-the-badge">
</p>

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)

## プロジェクトについて

このプロジェクトは、Qiitaの公開APIを利用して、シングルページアプリケーション（SPA）を構築することを目的としています。

<p align="right">(<a href="#top">トップへ</a>)</p>

## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク | バージョン |
| -------------------- | ---------- |
| Node.js              | 16.17.0    |
| React                | 19.0.0     |
| React Router         | 7.2.0      |
| TypeScript           | 5.7.2      |
| TailwindCSS          | 4.0.8      |
| Vitest               | 3.0.6      |
| Storybook            | 8.5.8      |
| Vite                 | 5.4.11     |

その他のパッケージのバージョンは `package.json` を参照してください。
[react router v7](https://reactrouter.com/)はフレームワークとして用いています。

<p align="right">(<a href="#top">トップへ</a>)</p>

## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->

```
❯ tree -a -I "node_modules|.git" -L 2
.
├── .github
│   └── workflows
├── .react-router
├── .storybook
├── .vscode
├── .yarn
├── app
│   ├── components
│   │   └── ui
│   ├── lib
│   │   └── utils.ts
│   ├── routes
│   │   ├── __TEST__
│   │   ├── Article.tsx
│   │   └── ArticleHome.tsx
│   ├── types
│   ├── app.css
│   ├── root.tsx
│   └── routes.ts
├── public
├── .dockerignore
├── .env
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .yarnrc.yml
├── components.json
├── Dockerfile
├── eslint.config.js
├── package.json
├── postcss.config.js
├── react-router.config.ts
├── README.md
├── tsconfig.json
├── vite-storybook.config.ts
├── vite.config.ts
├── vitest.config.ts
└── yarn.lock
```

- `.github/workflows`: GitHub Actionsのワークフロー設定ファイルを格納します。
- `.react-router`: React Router関連の設定ファイルを格納します。
- `.storybook`: Storybookの設定ファイルを格納します。
- `.vscode`: VSCodeの設定ファイルを格納します。
- `.yarn`: Yarn関連の設定ファイルを格納します。
- `app`: アプリケーションのソースコードを格納します。
  - `components`: 再利用可能なReactコンポーネントを格納します。
    - `ui`: shadcn/uiのコンポーネントを格納します。
  - `lib`: ライブラリやユーティリティ関数を格納します。
  - `routes`: 各ページのルートコンポーネントを格納します。
    - `__TEST__`: テストファイルを格納します。
  - `types`: 型定義ファイルを格納します。
  - `app.css`: アプリケーションのスタイルシートです。
  - `root.tsx`: アプリケーションのルートコンポーネントです。
  - `routes.ts`: ルート設定ファイルです。
- `public`: 公開用の静的ファイルを格納します。
- `Dockerfile`: Dockerの設定ファイルです。
- `eslint.config.js`: ESLintの設定ファイルです。
- `package.json`: プロジェクトの依存関係とスクリプトを定義します。
- `postcss.config.js`: PostCSSの設定ファイルです。
- `react-router.config.ts`: React Routerの設定ファイルです。
- `tsconfig.json`: TypeScriptの設定ファイルです。
- `vite-storybook.config.ts`: ViteとStorybookの設定ファイルです。
- `vite.config.ts`: Viteの設定ファイルです。
- `vitest.config.ts`: Vitestの設定ファイルです。
- `yarn.lock`: Yarnの依存関係ロックファイルです。

<p align="right">(<a href="#top">トップへ</a>)</p>

## 開発環境構築

<!-- コンテナの作成方法、パッケージのインストール方法など、開発環境構築に必要な情報を記載 -->

### 🐳 コンテナの作成と起動

`.env` ファイルを以下の環境変数例を元に作成してください。

```
.env
PORT=5173
VITE_QIITA_API_TOKEN=your_qiita_api_token
```

`.env` ファイルを作成後、以下のコマンドで開発環境を構築します。

```bash
docker build -t my-app .
docker run -p 5173:5173 --env-file .env my-app
```

### 🔍 動作確認

http://localhost:5173 にアクセスできるか確認してください。アクセスできたら成功です。

### 🛑 コンテナの停止

以下のコマンドでコンテナを停止することができます。

```bash
docker ps
docker stop <コンテナID>
```

### 🔧 環境変数の一覧

| 変数名               | 役割                         | デフォルト値 | DEV 環境での値               |
| -------------------- | ---------------------------- | ------------ | ---------------------------- |
| PORT                 | アプリケーションのポート番号 | 5173         |                              |
| VITE_QIITA_API_TOKEN | Qiita APIのアクセストークン  |              | 必要に応じて設定してください |

### 📦 依存関係のインストール

依存関係をインストールするには、以下のコマンドを使用します。

```bash
yarn install
```

### ⚡️ 開発サーバーの起動

HMRを使用して開発サーバーを起動します。

```bash
yarn dev
```

アプリケーションは `http://localhost:5173` で利用可能です。

### 🚩 プロダクションビルド

プロダクションビルドを作成します。

```bash
yarn build
```

### 🧪 テスト

このプロジェクトでは、[Vitest](https://vitest.dev/)を使用してテストを行います。テストを実行するには、以下のコマンドを使用します。

```bash
yarn test
```

### 📚 Storybook

コンポーネントのUIをドキュメント化するために[Storybook](https://storybook.js.org/)を使用しています。Storybookを起動するには、以下のコマンドを使用します。

```bash
yarn storybook
```

### 🔄 継続的インテグレーション (CI)

このプロジェクトは、[GitHub Actions](https://github.com/features/actions)を使用してCIを実行します。CIの設定は `.github/workflows` ディレクトリ内にあります。

<p align="right">(<a href="#top">トップへ</a>)</p>
