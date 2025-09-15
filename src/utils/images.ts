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

// 記事ディレクトリ内の画像パスを生成
export const getItemImagePath = (type: 'activities' | 'events' | 'team', slug: string, imageName: string) => {
  return `/data/${type}/items/${slug}/${imageName}`;
};

// 記事内の相対画像パスを絶対パスに変換
export const resolveItemImage = (type: 'activities' | 'events' | 'team', slug: string, imagePath: string) => {
  // 既に絶対URLの場合はそのまま
  if (/^(https?:)?\/\//.test(imagePath) || imagePath.startsWith('data:')) return imagePath;

  // 絶対パス（/で始まる）の場合はBASE_PATHを付与
  if (imagePath.startsWith('/')) return resolveAssetUrl(imagePath);

  // 相対パス（./image.jpg や image.jpg）の場合は記事ディレクトリ内のパスとして解決
  const cleanPath = imagePath.replace(/^\.\//, ''); // ./ を除去
  return resolveAssetUrl(getItemImagePath(type, slug, cleanPath));
};

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

  // front-matterの画像がある場合、記事内の相対パスとして解決
  if (frontImage) {
    return resolveItemImage('activities', activity.slug, frontImage);
  }

  // デフォルトのhero画像を試す
  const heroPath = getItemImagePath('activities', activity.slug, 'hero.jpg');
  // TODO: 実際の画像の存在確認が必要な場合はここで行う

  // フォールバック：プレースホルダー画像
  return getActivityImage(activity.slug, width, height);
};

export const pickEventImage = (
  event: { slug: string; image_url?: string },
  detail?: { data?: Record<string, any> },
  width = 1200,
  height = 630
) => {
  const fm = detail?.data ?? {};
  const frontImage: string | undefined = (fm.image as string) || (fm.cover as string) || (fm.thumbnail as string);

  // front-matterの画像がある場合、記事内の相対パスとして解決
  if (frontImage) {
    return resolveItemImage('events', event.slug, frontImage);
  }

  // CSVのimage_urlがある場合
  if (event.image_url) {
    return resolveAssetUrl(event.image_url);
  }

  // デフォルトのhero画像を試す
  const heroPath = getItemImagePath('events', event.slug, 'hero.jpg');
  // TODO: 実際の画像の存在確認が必要な場合はここで行う

  // フォールバック：プレースホルダー画像
  return getEventImage(event.slug, width, height);
};

export const pickMemberImage = (
  member: { slug: string; image_url?: string },
  detail?: { data?: Record<string, any> },
  size = 160
) => {
  const fm = detail?.data ?? {};
  const frontImage: string | undefined = (fm.image as string) || (fm.profile as string) || (fm.avatar as string);

  // front-matterの画像がある場合、記事内の相対パスとして解決
  if (frontImage) {
    return resolveItemImage('team', member.slug, frontImage);
  }

  // CSVのimage_urlがある場合
  if (member.image_url) {
    return resolveAssetUrl(member.image_url);
  }

  // デフォルトのprofile画像を試す
  const profilePath = getItemImagePath('team', member.slug, 'profile.jpg');
  // TODO: 実際の画像の存在確認が必要な場合はここで行う

  // フォールバック：生成画像
  return getMemberImage(member.slug, size);
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
