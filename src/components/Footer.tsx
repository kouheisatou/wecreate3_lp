'use client';

import React from 'react';
import { Container } from './ui';
import { ORGANIZATION, SOCIAL_LINKS, scrollToSection } from '../utils';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    scrollToSection(href);
  };

  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* ブランド情報 */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{ORGANIZATION.name}</h3>
            <p className="text-gray-300 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
              {ORGANIZATION.description}
            </p>
            <div className="flex items-center space-x-4">
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors touch-manipulation"
                aria-label="X (旧Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* クイックリンク */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-1.5 md:space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm md:text-base touch-manipulation py-1 block"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* コンタクト情報 */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Contact</h4>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mr-2 md:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors text-sm md:text-base touch-manipulation"
                >
{ORGANIZATION.twitterHandle}
                </a>
              </div>
              <p className="text-xs md:text-sm text-gray-400">
                DMでのお問い合わせを受け付けております
              </p>
            </div>
          </div>
        </div>

        {/* 区切り線 */}
        <div className="border-t border-gray-700 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* 著作権 */}
            <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-0">
              © {currentYear} WeCreate3. All rights reserved.
            </p>

            {/* 法的情報 */}
            <div className="flex space-x-4 md:space-x-6 text-xs md:text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors touch-manipulation py-1"
                onClick={(e) => e.preventDefault()}
              >
                プライバシーポリシー
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors touch-manipulation py-1"
                onClick={(e) => e.preventDefault()}
              >
                利用規約
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
