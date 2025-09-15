// ソーシャルメディアリンク
export const SOCIAL_LINKS = {
  twitter: 'https://x.com/We_Create_3',
} as const;

// 組織情報
export const ORGANIZATION = {
  name: 'WeCreate3',
  fullName: 'WeCreate3 - 学生が創るWeb3とメタバースの未来',
  description: '日本最大の学生Web3コミュニティ。Web3とメタバースの認識拡大を目的に活動している学生団体です。',
  established: '2022年7月',
  twitterHandle: '@We_Create_3',
} as const;

// ナビゲーションアイテム
export const NAVIGATION_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Mission', href: '#mission' },
  { label: 'Activities', href: '#activities' },
  { label: 'Events', href: '#events' },
  { label: 'Team', href: '#team' },
  { label: 'Join', href: '#join' },
  { label: 'Contact', href: '#contact' },
] as const;

// ページナビゲーション（トップページ以外からアクセス可能な主要ページ）
export const PAGE_NAVIGATION_ITEMS = [
  { label: '活動一覧', href: '/activities' },
  { label: 'イベント実績', href: '/events' },
  { label: '運営メンバー', href: '/team' },
] as const;
