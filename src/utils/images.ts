// 外部プレースホルダー画像のURL生成ユーティリティ
// 後で実画像URLに入れ替えやすいよう、関数経由で参照します。

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

// ピック関数（CSVやFrontmatterの画像があればそれを優先）
export const pickActivityImage = (
  activity: { slug: string },
  detail?: { data?: Record<string, any> },
  width = 1200,
  height = 630
) => {
  const fm = detail?.data ?? {};
  const frontImage: string | undefined = (fm.image as string) || (fm.cover as string) || (fm.thumbnail as string);
  return frontImage || getActivityImage(activity.slug, width, height);
};

export const pickEventImage = (
  event: { slug: string; image_url?: string },
  detail?: { data?: Record<string, any> },
  width = 1200,
  height = 630
) => {
  const fm = detail?.data ?? {};
  const frontImage: string | undefined = (fm.image as string) || (fm.cover as string) || (fm.thumbnail as string);
  return event.image_url || frontImage || getEventImage(event.slug, width, height);
};

export const pickMemberImage = (
  member: { slug: string; image_url?: string },
  size = 160
) => {
  return member.image_url || getMemberImage(member.slug, size);
};
