'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from './ui';
import { NAVIGATION_ITEMS, PAGE_NAVIGATION_ITEMS, ORGANIZATION, scrollToSection } from '../utils';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    scrollToSection(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between py-3 md:py-4">
          {/* ロゴ */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
            >
              {ORGANIZATION.name}
            </Link>
          </div>

          {/* デスクトップナビゲーション */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {isHomePage ? (
              // ホームページの場合：セクションへのアンカーリンク
              NAVIGATION_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium py-2 px-1"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {item.label}
                </a>
              ))
            ) : (
              // その他のページの場合：ページリンクとホームに戻るリンク
              <>
                <Link
                  href="/"
                  className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium py-2 px-1"
                >
                  Home
                </Link>
                {PAGE_NAVIGATION_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium py-2 px-1 ${
                      pathname === item.href ? 'border-b-2 border-gray-900' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            )}
          </div>

          {/* モバイルメニューボタン */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 touch-manipulation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニューを開く"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* モバイルメニュー */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-1">
              {isHomePage ? (
                // ホームページの場合：セクションへのアンカーリンク
                NAVIGATION_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors text-base font-medium py-3 px-4 rounded-md touch-manipulation"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                  >
                    {item.label}
                  </a>
                ))
              ) : (
                // その他のページの場合：ページリンクとホームに戻るリンク
                <>
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors text-base font-medium py-3 px-4 rounded-md touch-manipulation"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  {PAGE_NAVIGATION_ITEMS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors text-base font-medium py-3 px-4 rounded-md touch-manipulation ${
                        pathname === item.href ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};
