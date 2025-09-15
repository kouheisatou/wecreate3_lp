# WeCreate3 CMS機能 実装仕様書

## 概要

既存のWeCreate3ランディングページに、CSV + Markdownファイルベースの静的CMSシステムを実装し、Activities、Events、Team情報について一覧ページと詳細ページを提供する。

## 目標

- 静的サイトでありながら、コンテンツをGitリポジトリ上で管理可能
- CSV形式での構造化データ管理
- Markdown形式でのリッチコンテンツ管理
- クライアントサイドでの非同期データ読み込み
- SEO対応とパフォーマンスの両立

## データ構造設計

### ディレクトリ構造

```
/data/
├── activities/
│   ├── activities.csv
│   └── details/
│       ├── event-planning.md
│       ├── education.md
│       ├── community.md
│       └── research-development.md
├── events/
│   ├── events.csv
│   └── details/
│       ├── 2025-web3-ai-meeting.md
│       ├── 2023-student-meeting-2.md
│       ├── 2023-student-meeting-3.md
│       ├── 2023-hr3-hackathon.md
│       ├── 2023-kyoto-meeting.md
│       └── 2023-web3-study-session.md
└── team/
    ├── members.csv
    └── profiles/
        ├── yano-taiga.md
        ├── tanaka-taro.md
        ├── sato-hanako.md
        ├── suzuki-ichiro.md
        ├── takahashi-misaki.md
        ├── nakamura-kenta.md
        ├── yamada-hakase.md
        └── hayashi-ceo.md
```

### CSVスキーマ定義

#### activities.csv
```csv
id,title,slug,category,description,features,status,order,created_at,updated_at
event-planning,大規模イベント企画・運営,event-planning,イベント,業界リーダーとの直接交流機会を提供し...,業界リーダーとの交流|最新技術動向の共有|ネットワーキング機会,active,1,2023-01-01,2024-01-01
education,教育・啓発活動,education,教育,Web3・メタバースの基礎知識を普及し...,基礎知識普及|初心者向けコンテンツ|実践的ワークショップ,active,2,2023-01-01,2024-01-01
community,コミュニティ運営,community,コミュニティ,全国学生ネットワークを構築し...,全国学生ネットワーク|業界との橋渡し|継続的な学習機会,active,3,2023-01-01,2024-01-01
research-development,研究・開発支援,research-development,開発,ハッカソンや学生プロジェクトを支援し...,ハッカソン支援|学生プロジェクト支援|実践的スキル向上,active,4,2023-01-01,2024-01-01
```

#### events.csv
```csv
id,title,slug,date,year,location,description,participants,image_url,status,featured,created_at,updated_at
2025-web3-ai-meeting,Web3＆AI超会議,2025-web3-ai-meeting,2025-03-29,2025,メルカリ東京オフィス・六本木ヒルズ,学生団体ニューラビットとの共催イベント,KDDI|メルカリ|Binance Japan|野村ホールディングス|Google,/images/events/2025-web3-ai-meeting.jpg,published,true,2025-01-01,2025-01-01
2023-student-meeting-2,学生Web3&Metaverse超会議 第2弾,2023-student-meeting-2,2023-01-29,2023,WeCreate3初開催,WeCreate3として初めて開催した大規模イベント,,/images/events/2023-student-meeting-2.jpg,published,false,2023-01-29,2023-01-29
2023-student-meeting-3,学生Web3&Metaverse超会議 第3弾,2023-student-meeting-3,2023-05-27,2023,アクセンチュア・イノベーション・ハブ東京,衆議院議員 平将明氏が登壇,,/images/events/2023-student-meeting-3.jpg,published,true,2023-05-27,2023-05-27
2023-hr3-hackathon,HR3 HACKATHON プレイベント,2023-hr3-hackathon,2023-06-22,2023,渋谷CryptoBase,ハッカソンに向けた準備イベント,,/images/events/2023-hr3-hackathon.jpg,published,false,2023-06-22,2023-06-22
2023-kyoto-meeting,学生Web3&Metaverse超会議 in Kyoto,2023-kyoto-meeting,2023-06-30,2023,IVS Crypto公式サイドイベント,京都で開催された特別イベント,,/images/events/2023-kyoto-meeting.jpg,published,false,2023-06-30,2023-06-30
2023-web3-study-session,WeCreate3主催web3勉強会,2023-web3-study-session,2023-09-24,2023,Crypto Lounge GOX,基礎知識を学ぶ勉強会,,/images/events/2023-web3-study-session.jpg,published,false,2023-09-24,2023-09-24
```

#### members.csv
```csv
id,name,slug,role,type,specialty,affiliation,twitter,email,bio,image_url,status,order,created_at,updated_at
yano-taiga,矢野 大雅,yano-taiga,WeCreate3 代表,leader,,,,学生Web3コミュニティのパイオニア,/images/team/yano-taiga.jpg,active,1,2023-01-01,2024-01-01
tanaka-taro,田中 太郎,tanaka-taro,イベント企画責任者,member,イベントプロデュース、コミュニティマネジメント,,,大規模イベントの企画運営を得意とする,/images/team/tanaka-taro.jpg,active,2,2023-01-01,2024-01-01
sato-hanako,佐藤 花子,sato-hanako,マーケティング・広報担当,member,デジタルマーケティング、SNS運用,,,SNSを活用した効果的な広報戦略を立案,/images/team/sato-hanako.jpg,active,3,2023-01-01,2024-01-01
suzuki-ichiro,鈴木 一郎,suzuki-ichiro,技術・開発担当,member,ブロックチェーン開発、スマートコントラクト,,,実践的な技術開発をリードする,/images/team/suzuki-ichiro.jpg,active,4,2023-01-01,2024-01-01
takahashi-misaki,高橋 美咲,takahashi-misaki,パートナーシップ担当,member,企業連携、ビジネス開発,,,企業との戦略的パートナーシップを構築,/images/team/takahashi-misaki.jpg,active,5,2023-01-01,2024-01-01
nakamura-kenta,中村 健太,nakamura-kenta,教育・コンテンツ担当,member,教育プログラム設計、コンテンツ制作,,,学習効果の高い教育プログラムを設計,/images/team/nakamura-kenta.jpg,active,6,2023-01-01,2024-01-01
yamada-hakase,山田 博士,yamada-hakase,アドバイザー,advisor,ブロックチェーン技術、暗号学,某大学教授,,学術的視点からのアドバイザリー,/images/team/yamada-hakase.jpg,active,7,2023-01-01,2024-01-01
hayashi-ceo,林 CEO,hayashi-ceo,アドバイザー,advisor,事業戦略、資金調達,Web3スタートアップ代表,,ビジネス戦略とスタートアップ経験,/images/team/hayashi-ceo.jpg,active,8,2023-01-01,2024-01-01
```

### Markdownファイル仕様

各Markdownファイルは以下のフロントマター形式を採用：

```markdown
---
id: event-planning
title: 大規模イベント企画・運営
description: 業界リーダーとの直接交流機会を提供
image: /images/activities/event-planning.jpg
tags: [イベント, ネットワーキング, 業界交流]
---

# 大規模イベント企画・運営

## 概要

WeCreate3では、Web3・メタバース業界のリーダーと学生を繋ぐ大規模イベントを企画・運営しています...

## 主な取り組み

### 1. 業界リーダーとの直接交流
...

### 2. 最新技術動向の共有
...
```

## URL構造設計

```
/ (既存のトップページ)
├── /activities/
│   ├── /                    # 活動一覧ページ
│   └── /[slug]/             # 活動詳細ページ
├── /events/
│   ├── /                    # イベント一覧ページ
│   └── /[slug]/             # イベント詳細ページ
└── /team/
    ├── /                    # チーム一覧ページ
    └── /[slug]/             # メンバー詳細ページ
```

## 技術仕様

### フロントエンド実装

1. **データフェッチング**
   - `fetch()` APIを使用したCSV/MDファイルの非同期読み込み
   - CSV解析: `Papa Parse`ライブラリまたは独自実装
   - Markdown解析: `react-markdown`ライブラリ

2. **状態管理**
   - React Context APIまたは独自のデータストア
   - ローカルストレージでのキャッシュ機能

3. **コンポーネント設計**
   - 一覧ページコンポーネント（ActivityList、EventList、TeamList）
   - 詳細ページコンポーネント（ActivityDetail、EventDetail、MemberDetail）
   - 共通UIコンポーネントの拡張

### パフォーマンス最適化

1. **データキャッシュ**
   - ブラウザキャッシュの活用
   - Service Workerによるオフライン対応（オプション）

2. **遅延読み込み**
   - Intersection Observer APIを使用した画像遅延読み込み
   - ページングまたは無限スクロール

3. **SEO対応**
   - 動的なメタタグ設定
   - 構造化データ（JSON-LD）の実装

## 開発フェーズ

### Phase 1: 基盤構築
1. データ構造の作成
2. データフェッチングユーティリティの実装
3. 基本的な一覧・詳細ページの作成

### Phase 2: UI/UX改善
1. デザインシステムの適用
2. レスポンシブ対応
3. アクセシビリティ改善

### Phase 3: 機能拡張
1. 検索・フィルタリング機能
2. パフォーマンス最適化
3. SEO対応

## 制約事項・考慮点

1. **静的サイトの制約**
   - サーバーサイド処理が使用不可
   - データベースが使用不可

2. **パフォーマンス**
   - 大量データの場合の読み込み時間
   - ネットワーク環境による影響

3. **保守性**
   - CSVファイルの手動編集によるデータ整合性
   - ファイル構造の変更時の影響範囲

4. **セキュリティ**
   - クライアントサイドでのデータ処理
   - データファイルの直接アクセス可能性