// 外部プレースホルダー画像のURL生成ユーティリティ
// 後で実画像URLに入れ替えやすいよう、関数経由で参照します。
import { BASE_PATH } from './constants';

// BASE_PATH を考慮してアセットURLを解決
export const resolveAssetUrl = (url?: string): string | undefined => {
  if (!url) return url;
  // すでに絶対URLやデータURLならそのまま
  if (/^(https?:)?\/\//.test(url) || url.startsWith('data:')) return url;
  // 先頭スラッシュのパスは BASE_PATH を付与
  if (url.startsWith('/')) return `${BASE_PATH}${url}`;
  return url;
};

// 従来の画像パス構造（変更なし）

export const getActivityImage = (slug: string, width = 800, height = 480) => {
  const seed = encodeURIComponent(`activity-${slug}`);
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

export const getEventImage = (slug: string, width = 800, height = 480) => {
  const seed = encodeURIComponent(`event-${slug}`);
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

export const getMemberImage = (unique: string, size = 160) => {
  const seed = encodeURIComponent(unique);
  // シンプルなモノクロのイニシャルアイコン（UI Avatars）
  return `https://ui-avatars.com/api/?name=${seed}&size=${size}&background=ECECEC&color=111111&bold=true&format=png`;
  // return `https://i.pravatar.cc/${size}?u=${seed}`; // 代替案
};

export const getSponsorLogo = (slug: string, width = 200, height = 100) => {
  const seed = encodeURIComponent(`sponsor-${slug}`);
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

// ピック関数（CSVやFrontmatterの画像があればそれを優先）
export const pickActivityImage = (
  activity: { slug: string },
  detail?: { data?: Record<string, any> },
  width = 1200,
  height = 630
) => {
  const fm = detail?.data ?? {};
  const frontImage: string | undefined = (fm.image as string) || (fm.cover as string) || (fm.thumbnail as string);
  return resolveAssetUrl(frontImage) || getActivityImage(activity.slug, width, height);
};

export const pickEventImage = (
  event: { slug: string; image_url?: string },
  detail?: { data?: Record<string, any> },
  width = 1200,
  height = 630
) => {
  const fm = detail?.data ?? {};
  const frontImage: string | undefined = (fm.image as string) || (fm.cover as string) || (fm.thumbnail as string);
  // frontmatter の画像を優先し、次に CSV の image_url、最後にプレースホルダー
  return (
    resolveAssetUrl(frontImage) ||
    resolveAssetUrl(event.image_url) ||
    getEventImage(event.slug, width, height)
  );
};

export const pickMemberImage = (
  member: { slug: string; image_url?: string },
  size = 160
) => {
  return resolveAssetUrl(member.image_url) || getMemberImage(member.slug, size);
};

export const pickSponsorLogo = (
  sponsor: { slug: string; logo_url?: string },
  width = 200,
  height = 100
) => {
  // CSVのlogo_urlがある場合
  if (sponsor.logo_url) {
    return resolveAssetUrl(sponsor.logo_url);
  }

  // フォールバック：プレースホルダー画像
  return getSponsorLogo(sponsor.slug, width, height);
};

// スポンサーロゴが利用可能かどうかチェック
export const hasSponsorLogo = (sponsor: { logo_url?: string }): boolean => {
  return !!(sponsor.logo_url);
};
