import React from 'react';
import { Section } from '../ui';

export const MissionSection: React.FC = () => {
  return (
    <Section id="mission">
      <div className="max-w-4xl mx-auto hexagon-pattern">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 px-4 unique-header">
            ミッション・ビジョン
          </h2>
          <div className="decorative-divider"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 px-4">
          {/* ミッション */}
          <div className="space-y-6 md:space-y-8 unique-card p-6 md:p-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 md:mb-6 animated-icon">
                Mission
              </h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-gray-900 rounded-full mt-2 mr-3 md:mr-4 flex-shrink-0 transform rotate-45"></div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Web3とメタバースの認識拡大
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-gray-900 rounded-full mt-2 mr-3 md:mr-4 flex-shrink-0 transform rotate-45"></div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    新しい技術の可能性創出
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-gray-900 rounded-full mt-2 mr-3 md:mr-4 flex-shrink-0 transform rotate-45"></div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    学生・企業・官公庁とのネットワーク構築
                  </p>
                </div>
              </div>
            </div>

            {/* 価値観 */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 md:mb-6 animated-icon">
                Values
              </h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-gray-600 mt-2 mr-3 md:mr-4 flex-shrink-0 transform rotate-45"></div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    フレッシュな視点
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-gray-600 mt-2 mr-3 md:mr-4 flex-shrink-0 transform rotate-45"></div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    学習意欲の高さ
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-gray-600 mt-2 mr-3 md:mr-4 flex-shrink-0 transform rotate-45"></div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    強固なネットワーク効果
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ビジョン */}
          <div className="mt-8 lg:mt-0 unique-card p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 md:mb-6 animated-icon">
              Vision
            </h3>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8 rounded-lg border border-gray-200">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
                学生の力でWeb3とメタバースの未来を創造し、次世代デジタル社会をリードする人材を育成する。
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                私たちは、新しいテクノロジーの可能性を信じ、学生という立場から業界の発展に貢献していきます。産学官連携を通じて、実践的な学習機会を提供し、未来のイノベーターを育成することを目指しています。
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
