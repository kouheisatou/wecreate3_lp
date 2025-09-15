import React from 'react';
import { Section } from '../ui';

export const ContactSection: React.FC = () => {
  const contactTypes = [
    {
      title: 'イベント参加に関するご質問',
      description: 'イベントの詳細や参加方法についてお気軽にお問い合わせください。',
      icon: '🎯',
    },
    {
      title: 'コラボレーションのご提案',
      description: '一緒にイベントを企画したい、協力したいという団体・企業様からのご提案をお待ちしています。',
      icon: '🤝',
    },
    {
      title: 'メディア取材のご依頼',
      description: 'WeCreate3の活動について取材をご希望のメディア関係者様はこちらからお問い合わせください。',
      icon: '📺',
    },
    {
      title: 'パートナーシップのご相談',
      description: 'スポンサーシップや長期的なパートナーシップについてのご相談を承ります。',
      icon: '🤝',
    },
  ];

  const faqs = [
    {
      question: 'イベント参加に費用はかかりますか？',
      answer: '基本的にすべてのイベントは無料でご参加いただけます。事前登録制となっておりますので、公式SNSで開催情報をご確認ください。',
    },
    {
      question: '学生以外でも参加できますか？',
      answer: 'はい、社会人の方でもWeb3・メタバースに興味をお持ちの方であればご参加いただけます。多様なバックグラウンドの方々との交流を歓迎しています。',
    },
    {
      question: 'プログラミング経験がなくても大丈夫ですか？',
      answer: '全く問題ありません。初心者向けの内容から上級者向けまで幅広く対応しており、基礎から学べる機会を多数ご用意しています。',
    },
    {
      question: '地方からでも参加できますか？',
      answer: 'オンライン開催のイベントも多数ございますので、全国どこからでもご参加いただけます。また、主要都市での開催時は地方からの参加者向けの配慮も行っています。',
    },
  ];

  return (
    <Section id="contact" background="gray">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 px-4">
            お問い合わせ
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            WeCreate3に関するご質問、ご提案、ご相談など、
            お気軽にお問い合わせください。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 px-4">
          {/* お問い合わせ内容 */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 md:mb-8">
              お問い合わせ内容
            </h3>
            <div className="space-y-4 md:space-y-6">
              {contactTypes.map((type, index) => (
                <div key={index} className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="text-xl md:text-2xl mr-3 md:mr-4 mt-1 flex-shrink-0">{type.icon}</div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                        {type.title}
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* コンタクト方法とFAQ */}
          <div className="space-y-6 md:space-y-8">
            {/* 公式SNS */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 md:mb-6">
                公式SNS
              </h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600 mr-2 md:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">X (旧Twitter)</p>
                    <a
                      href="https://x.com/We_Create_3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 text-sm sm:text-base touch-manipulation"
                    >
                      @We_Create_3
                    </a>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  DMでのお問い合わせを受け付けております。
                  お気軽にメッセージをお送りください。
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 md:mb-6">
                よくある質問
              </h3>
              <div className="space-y-3 md:space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-3 md:pb-4 last:border-b-0 last:pb-0">
                    <h4 className="font-medium text-gray-900 mb-1.5 md:mb-2 text-sm sm:text-base">
                      Q. {faq.question}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      A. {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
