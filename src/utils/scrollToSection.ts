/**
 * セクションへのスムーズスクロール関数
 * @param targetId スクロール先のセクションID
 * @param offset オフセット値（デフォルト: 80px）
 */
export const scrollToSection = (targetId: string, offset: number = 80): void => {
  const element = document.querySelector(targetId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};
