import React from 'react';
import { Section } from '../ui';

export const MissionSection: React.FC = () => {
  return (
    <Section id="mission">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            ミッション・ビジョン
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ミッション */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Mission
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-600 leading-relaxed">
                    Web3とメタバースの認識拡大
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-600 leading-relaxed">
                    新しい技術の可能性創出
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-600 leading-relaxed">
                    学生・企業・官公庁とのネットワーク構築
                  </p>
                </div>
              </div>
            </div>

            {/* 価値観 */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Values
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-600 leading-relaxed">
                    フレッシュな視点
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-600 leading-relaxed">
                    学習意欲の高さ
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-600 leading-relaxed">
                    強固なネットワーク効果
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ビジョン */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Vision
            </h3>
            <div className="bg-gray-50 p-8 rounded-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                学生の力でWeb3とメタバースの未来を創造し、次世代デジタル社会をリードする人材を育成する。
              </p>
              <p className="text-gray-600 leading-relaxed">
                私たちは、新しいテクノロジーの可能性を信じ、学生という立場から業界の発展に貢献していきます。産学官連携を通じて、実践的な学習機会を提供し、未来のイノベーターを育成することを目指しています。
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
