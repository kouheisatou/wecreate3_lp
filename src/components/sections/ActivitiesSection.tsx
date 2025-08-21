import React from 'react';
import { Section } from '../ui';

export const ActivitiesSection: React.FC = () => {
  const activities = [
    {
      title: '大規模イベント企画・運営',
      description: '業界リーダーとの直接交流機会を提供し、最新技術動向の共有とネットワーキングの場を創出しています。',
      features: ['業界リーダーとの交流', '最新技術動向の共有', 'ネットワーキング機会'],
    },
    {
      title: '教育・啓発活動',
      description: 'Web3・メタバースの基礎知識を普及し、初心者向けコンテンツや実践的ワークショップを開催しています。',
      features: ['基礎知識普及', '初心者向けコンテンツ', '実践的ワークショップ'],
    },
    {
      title: 'コミュニティ運営',
      description: '全国学生ネットワークを構築し、業界プロフェッショナルとの橋渡しや継続的な学習・交流の場を提供しています。',
      features: ['全国学生ネットワーク', '業界との橋渡し', '継続的な学習機会'],
    },
    {
      title: '研究・開発支援',
      description: 'ハッカソンや学生プロジェクトを支援し、実際のプロダクト開発を通じて実践的なスキル向上を図っています。',
      features: ['ハッカソン支援', '学生プロジェクト支援', '実践的スキル向上'],
    },
  ];

  return (
    <Section id="activities" background="gray">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            主な活動
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            WeCreate3では、学生の皆さんがWeb3とメタバースの世界で活躍できるよう、
            多角的なアプローチで支援を行っています。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {activity.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {activity.description}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">
                  Key Features
                </h4>
                <div className="space-y-2">
                  {activity.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
