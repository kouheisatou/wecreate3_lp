# WeCreate3 Landing Page

WeCreate3（学生が創るWeb3とメタバースの未来）の公式ランディングページです。

## 🚀 プロジェクト概要

WeCreate3は、Web3とメタバースの認識拡大を目的に活動している日本最大の学生Web3コミュニティです。このランディングページは、組織の活動内容、イベント実績、参加方法などを紹介し、新しいメンバーの参加を促進することを目的としています。

## 🛠 技術スタック

- **フレームワーク**: Next.js 15
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **デプロイ**: Vercel（推奨）

## 📁 プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # トップページ
├── components/            # Reactコンポーネント
│   ├── ui/               # 再利用可能なUIコンポーネント
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   └── Section.tsx
│   ├── sections/         # ページセクション
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── MissionSection.tsx
│   │   ├── ActivitiesSection.tsx
│   │   ├── EventsSection.tsx
│   │   ├── TeamSection.tsx
│   │   ├── JoinSection.tsx
│   │   └── ContactSection.tsx
│   ├── Header.tsx        # ナビゲーションヘッダー
│   └── Footer.tsx        # フッター
└── utils/                # ユーティリティ関数
    ├── constants.ts      # 定数定義
    └── scrollToSection.ts # スムーズスクロール関数
```

## 🎨 デザインコンセプト

- **モノクロ & シンプル**: 品のあるモノクロデザインで、内容に集中できるUI
- **レスポンシブ**: モバイルファーストで全デバイスに対応
- **アクセシビリティ**: 誰でも使いやすいインターフェース
- **パフォーマンス**: 高速読み込みとSEO最適化

## 🚀 開発環境のセットアップ

1. **依存関係のインストール**
   ```bash
   npm install
   ```

2. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

3. **ブラウザでアクセス**
   ```
   http://localhost:3000
   ```

## 📝 利用可能なスクリプト

- `npm run dev` - 開発サーバーの起動
- `npm run build` - 本番用ビルド
- `npm run start` - 本番サーバーの起動
- `npm run lint` - ESLintによるコードチェック

## 🌐 デプロイ

### Vercelでのデプロイ（推奨）

1. [Vercel](https://vercel.com)にGitHubリポジトリを接続
2. 自動的にビルド・デプロイが実行されます

### その他のプラットフォーム

- **Netlify**: `npm run build`後、`out`フォルダをデプロイ
- **GitHub Pages**: GitHub Actionsを使用してデプロイ

## 📄 ページ構成

1. **Hero Section** - メインキャッチコピーとCTA
2. **About Section** - WeCreate3について
3. **Mission Section** - ミッション・ビジョン
4. **Activities Section** - 主な活動内容
5. **Events Section** - イベント実績
6. **Team Section** - 運営メンバー
7. **Join Section** - 参加方法
8. **Contact Section** - お問い合わせ

## 🔧 カスタマイズ

### 色の変更

`src/app/globals.css`でCSS変数を変更：

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  /* その他の色設定 */
}
```

### コンテンツの更新

各セクションのコンテンツは対応するコンポーネントファイルで更新できます。

### 新しいセクションの追加

1. `src/components/sections/`に新しいコンポーネントを作成
2. `src/components/sections/index.ts`でエクスポート
3. `src/app/page.tsx`でインポート・使用

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📞 サポート

質問や問題がある場合は、以下の方法でお問い合わせください：

- **X (旧Twitter)**: [@We_Create_3](https://x.com/We_Create_3)
- **GitHub Issues**: このリポジトリのIssuesタブ

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

---

**WeCreate3** - 学生が創るWeb3とメタバースの未来 🚀
# wecreate3_lp
