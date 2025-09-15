// filepath: /Volumes/SD/github/wecreate3_lp/src/utils/images.ts
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
  // シンプルなモノクロに近いテイストにしたい場合は ui-avatars などに切替も可能
  return `https://ui-avatars.com/api/?name=${seed}&size=${size}&background=ECECEC&color=111111&bold=true&format=png`;
  // return `https://i.pravatar.cc/${size}?u=${seed}`;
};

