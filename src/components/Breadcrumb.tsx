'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from './ui';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const pathname = usePathname();

  // パスから自動的にパンくずを生成
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (pathname === '/') {
      return [{ label: 'ホーム' }];
    }

    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'ホーム', href: '/' }
    ];

    // パスセグメントからパンくずを構築
    segments.forEach((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      let label = segment;

      // セグメント名を日本語に変換
      switch (segment) {
        case 'activities':
          label = '活動一覧';
          break;
        case 'events':
          label = 'イベント実績';
          break;
        case 'team':
          label = '運営メンバー';
          break;
        case 'sponsors':
          label = 'スポンサー';
          break;
        default:
          // slugの場合はそのまま（詳細ページでは個別にitemsで上書き）
          label = segment;
          break;
      }

      breadcrumbs.push({
        label,
        href: index === segments.length - 1 ? undefined : href // 最後の項目はリンクなし
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  // ホームページでは表示しない
  if (pathname === '/') {
    return null;
  }

  return (
    <nav className="bg-gray-50 border-b border-gray-200 py-3">
      <Container>
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 text-gray-400 mx-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  );
};