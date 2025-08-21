'use client';

import React from 'react';
import { Section, Button } from '../ui';

export const JoinSection: React.FC = () => {
  const targetAudience = [
    'Web3・メタバースに興味を持つ学生',
    '技術トレンドに関心のある社会人',
    '新技術分野でのキャリアを考えている方',
  ];

  const steps = [
    {
      number: '01',
      title: '公式SNSをフォロー',
      description: '@We_Create_3をフォローして最新情報をチェック',
      icon: '📱',
    },
    {
      number: '02',
      title: 'イベント情報をチェック',
      description: '定期的に開催されるイベントの詳細を確認',
      icon: '📅',
    },
    {
      number: '03',
      title: 'イベントに申し込み',
      description: '興味のあるイベントに事前登録で参加',
      icon: '✍️',
    },
    {
      number: '04',
      title: 'コミュニティに参加',
      description: '継続的な学習と交流の場に参加',
      icon: '🤝',
    },
  ];

  const benefits = [
    {
      title: '参加特典',
      items: ['1000円相当のSOL', 'Binanceグッズ', 'その他イベント特典'],
    },
    {
      title: '学習機会',
      items: ['業界情報の早期アクセス', '専門家による講演', '実践的ワークショップ'],
    },
    {
      title: 'ネットワーキング',
      items: ['限定交流イベント', '業界プロとの直接対話', '全国の学生とのつながり'],
    },
  ];

  return (
    <Section id="join">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 px-4">
            参加方法
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            WeCreate3への参加は簡単です。以下のステップに従って、
            Web3・メタバースの学習と成長の旅を始めましょう。
          </p>
        </div>

        {/* 対象者 */}
        <div className="mb-12 md:mb-16 px-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 md:mb-8 text-center">
            こんな方におすすめ
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {targetAudience.map((audience, index) => (
              <div key={index} className="bg-gray-50 p-4 md:p-6 rounded-lg text-center">
                <div className="text-xl md:text-2xl mb-2 md:mb-3">👥</div>
                <p className="text-sm sm:text-base text-gray-700 font-medium">{audience}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 参加ステップ */}
        <div className="mb-12 md:mb-16 px-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-8 md:mb-12 text-center">
            参加ステップ
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4 md:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <span className="font-bold text-sm sm:text-base">{step.number}</span>
                  </div>
                  <div className="text-2xl sm:text-3xl">{step.icon}</div>
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 md:mb-3">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 参加特典 */}
        <div className="mb-10 md:mb-12 px-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 md:mb-8 text-center">
            参加特典・メリット
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                  {benefit.title}
                </h4>
                <ul className="space-y-1.5 md:space-y-2">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 md:mr-3 flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center px-4">
          <div className="bg-gray-900 text-white p-6 md:p-8 rounded-lg">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 md:mb-4">
              今すぐ参加して、未来を一緒に創りませんか？
            </h3>
            <p className="text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
              Web3・メタバースの世界で活躍したい学生の皆さん、
              WeCreate3で新しいチャレンジを始めましょう。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button variant="secondary" size="lg" href="#events" className="touch-manipulation">
                最新イベントを確認する
              </Button>
              <a
                href="https://x.com/We_Create_3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium rounded-lg border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-200 touch-manipulation min-h-[48px]"
              >
                公式Xをフォロー
                <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
