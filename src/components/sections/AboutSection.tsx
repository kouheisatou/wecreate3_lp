import React from 'react';
import { Section } from '../ui';

export const AboutSection: React.FC = () => {
  const features = [
    {
      title: '学生主体の運営',
      description: '全国の大学生が主体となって運営し、フレッシュな視点でWeb3とメタバースの普及に取り組んでいます。',
    },
    {
      title: '全国規模のネットワーク',
      description: '早稲田、上智、法政、立教、iU、神大、東北大など、全国の大学から学生が参加しています。',
    },
    {
      title: '企業・官公庁との連携',
      description: 'KDDI、メルカリ、Google等の大手企業や官公庁との連携により、実践的な学習機会を提供しています。',
    },
  ];

  return (
    <Section id="about" background="gray">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 px-4 unique-header">
            WeCreate3について
          </h2>
          <div className="decorative-divider"></div>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed px-4">
            2022年7月設立。各大学の学生団体が結集し、Web3とメタバースの認識拡大と可能性創出を目的として活動する日本最大の学生Web3コミュニティです。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
          {features.map((feature, index) => (
            <div key={index} className="unique-card p-6 md:p-8">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 md:mb-4 animated-icon">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center px-4">
          <div className="decorative-divider"></div>
          <div className="unique-card p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 md:mb-6 unique-header">
              参加大学例
            </h3>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-gray-600">
              {['早稲田大学', '上智大学', '法政大学', '立教大学', 'iU', '神奈川大学', '東北大学'].map((university, index) => (
                <span key={index} className="px-4 py-2 unique-tag text-sm touch-manipulation">
                  {university}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
