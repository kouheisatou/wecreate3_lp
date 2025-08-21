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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            WeCreate3について
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            2022年7月設立。各大学の学生団体が集結し、Web3とメタバースの認識拡大と可能性創出を目的として活動する日本最大の学生Web3コミュニティです。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              参加大学例
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-gray-600">
              {['早稲田大学', '上智大学', '法政大学', '立教大学', 'iU', '神奈川大学', '東北大学'].map((university, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
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
