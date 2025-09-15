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

## ✏️ 編集者向け：記事・コンテンツ追加ガイド

### 📝 コンテンツ構造の概要

このサイトでは3種類のコンテンツを管理しています：

1. **Activities（活動）** - WeCreate3の主な活動内容
2. **Events（イベント）** - 開催したイベントの実績
3. **Team（チーム）** - 運営メンバーの情報

### 📁 データファイルの場所

すべてのコンテンツデータは `public/data/` フォルダに格納されています：

```
public/data/
├── activities/
│   ├── activities.csv          # 活動一覧データ
│   └── details/               # 各活動の詳細ページ（Markdown）
│       ├── community.md
│       ├── education.md
│       └── ...
├── events/
│   ├── events.csv             # イベント一覧データ
│   └── details/               # 各イベントの詳細ページ（Markdown）
│       ├── 2023-hr3-hackathon.md
│       └── ...
└── team/
    ├── members.csv            # メンバー一覧データ
    └── profiles/              # 各メンバーのプロフィール（Markdown）
        ├── tanaka-taro.md
        └── ...
```

### 🎯 新しいイベントを追加する手順

#### 1. CSVファイルにイベント情報を追加

`public/data/events/events.csv` を編集し、新しい行を追加：

```csv
id,title,slug,date,year,location,description,participants,image_url,status,featured,created_at,updated_at
new-event-2025,新しいイベント,new-event-2025,2025-04-15,2025,東京,イベントの説明,企業A|企業B|企業C,/images/events/new-event-2025.jpg,published,false,2025-01-15,2025-01-15
```

**フィールド説明：**
- `id`: 一意のID（英数字とハイフン）
- `title`: イベントタイトル
- `slug`: URL用のスラッグ（英数字とハイフン）
- `date`: 開催日（YYYY-MM-DD形式）
- `year`: 開催年
- `location`: 開催場所
- `description`: 短い説明文
- `participants`: 参加企業（`|`で区切り）
- `image_url`: サムネイル画像のパス
- `status`: 公開状態（`published` または `draft`）
- `featured`: 注目イベントかどうか（`true` または `false`）
- `created_at`, `updated_at`: 作成・更新日時

#### 2. 詳細ページのMarkdownファイルを作成

`public/data/events/details/new-event-2025.md` を作成：

```markdown
---
title: "新しいイベント"
cover: "/images/events/new-event-2025.jpg"
---

# 概要

イベントの詳細な説明をここに記載します。

- 開催日: 2025年4月15日
- 会場: 東京

# プログラム

1. オープニング
2. 基調講演
3. パネルディスカッション

# 期待できること

- 最新技術の学習
- ネットワーキング
- 実践的な知識の習得

# 参加方法

最新情報は公式X（@We_Create_3）で告知します。
```

#### 3. 画像ファイルを追加

`public/images/events/new-event-2025.jpg` に画像を配置

**推奨画像サイズ：**
- サムネイル用: 480×320px
- 詳細ページ用: 1200×630px

### 🏃 新しい活動を追加する手順

#### 1. CSVファイルに活動情報を追加

`public/data/activities/activities.csv` を編集：

```csv
id,title,slug,category,description,features,status,order,created_at,updated_at
new-activity,新しい活動,new-activity,カテゴリ,活動の説明,特徴1|特徴2|特徴3,active,5,2025-01-15,2025-01-15
```

**フィールド説明：**
- `order`: 表示順序（数字が小さいほど上に表示）
- `features`: 活動の特徴（`|`で区切り）

#### 2. 詳細ページを作成

`public/data/activities/details/new-activity.md` を作成：

```markdown
---
title: "新しい活動"
cover: "/images/activities/new-activity.jpg"
category: "カテゴリ"
---

# 活動概要

詳細な活動内容を記載...

# 主な取り組み

- 取り組み1
- 取り組み2

# 成果

これまでの成果を記載...
```

### 👥 新しいメンバーを追加する手順

#### 1. CSVファイルにメンバー情報を追加

`public/data/team/members.csv` を編集：

```csv
id,name,slug,role,type,specialty,affiliation,twitter,email,bio,image_url,status,order,created_at,updated_at
new-member,新メンバー,new-member,役職,member,専門分野,所属,@twitter_handle,email@example.com,簡単な紹介,/images/team/new-member.jpg,active,10,2025-01-15,2025-01-15
```

**フィールド説明：**
- `type`: メンバータイプ（`leader`, `member`, `advisor`）
- `specialty`: 専門分野（任意）
- `affiliation`: 所属組織（任意）

#### 2. プロフィールページを作成

`public/data/team/profiles/new-member.md` を作成：

```markdown
---
name: "新メンバー"
role: "役職"
image: "/images/team/new-member.jpg"
twitter: "@twitter_handle"
email: "email@example.com"
---

# プロフィール

詳細なプロフィール情報...

# 経歴

- 経歴1
- 経歴2

# メッセージ

メンバーからのメッセージ...
```

### 🎨 画像管理のガイドライン

#### 画像の配置場所
```
public/images/
├── activities/        # 活動関連画像
├── events/           # イベント関連画像
└── team/             # メンバー関連画像
```

#### 推奨画像サイズ
- **イベントサムネイル**: 480×320px
- **活動サムネイル**: 1200×630px
- **メンバー画像**: 400×400px（正方形）

#### ファイル名規則
- 英数字とハイフンのみ使用
- 拡張子は小文字（.jpg, .png）
- 例: `2025-web3-meeting.jpg`

### ⚠️ 注意事項

1. **CSVファイル編集時の注意**
   - 文字エンコーディングはUTF-8
   - カンマ区切りの値にカンマが含まれる場合はダブルクォートで囲む
   - `|`（パイプ）文字は複数値の区切り文字として使用

2. **公開設定**
   - `status` を `published` または `active` に設定した内容のみサイトに表示
   - `draft` 設定でテスト確認が可能

3. **画像最適化**
   - ファイルサイズを適切に圧縮
   - WebP形式の使用を推奨

4. **日付形式**
   - すべての日付は `YYYY-MM-DD` 形式で統一

### 🔄 更新後の確認手順

1. ローカル環境で動作確認
   ```bash
   npm run dev
   ```

2. ブラウザで http://localhost:3000 にアクセス

3. 新しく追加したコンテンツが正しく表示されることを確認

4. 各リンクが正常に機能することを確認

### 🤝 コントリビューション

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
