import React from 'react';
import { Section } from '../ui';

export const EventsSection: React.FC = () => {
  const events = [
    {
      year: '2025年',
      items: [
        {
          date: '3月29日',
          title: 'Web3＆AI超会議',
          location: 'メルカリ東京オフィス・六本木ヒルズ',
          description: '学生団体ニューラビットとの共催イベント',
          participants: ['KDDI', 'メルカリ', 'Binance Japan', '野村ホールディングス', 'Google'],
        },
      ],
    },
    {
      year: '2023年',
      items: [
        {
          date: '1月29日',
          title: '学生Web3&Metaverse超会議 第2弾',
          location: 'WeCreate3初開催',
          description: 'WeCreate3として初めて開催した大規模イベント',
        },
        {
          date: '5月27日',
          title: '学生Web3&Metaverse超会議 第3弾',
          location: 'アクセンチュア・イノベーション・ハブ東京',
          description: '衆議院議員 平将明氏が登壇',
        },
        {
          date: '6月22日',
          title: 'HR3 HACKATHON プレイベント',
          location: '渋谷CryptoBase',
          description: 'ハッカソンに向けた準備イベント',
        },
        {
          date: '6月末',
          title: '学生Web3&Metaverse超会議 in Kyoto',
          location: 'IVS Crypto公式サイドイベント',
          description: '京都で開催された特別イベント',
        },
        {
          date: '9月24日',
          title: 'WeCreate3主催web3勉強会',
          location: 'Crypto Lounge GOX',
          description: '基礎知識を学ぶ勉強会',
        },
      ],
    },
  ];

  return (
    <Section id="events">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            イベント実績
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            これまでに多くの大規模イベントを成功に導き、学生と業界のプロフェッショナルを繋ぐ場を提供してきました。
          </p>
        </div>

        {/* イベント履歴 */}
        <div className="space-y-12 mb-16">
          {events.map((yearGroup, yearIndex) => (
            <div key={yearIndex}>
              <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
                {yearGroup.year}
              </h3>
              <div className="space-y-6">
                {yearGroup.items.map((event, eventIndex) => (
                  <div key={eventIndex} className="bg-gray-50 p-6 rounded-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                      <div className="lg:col-span-1">
                        <div className="text-sm font-medium text-gray-500 mb-1">日付</div>
                        <div className="font-semibold text-gray-900">{event.date}</div>
                      </div>
                      <div className="lg:col-span-2">
                        <div className="text-sm font-medium text-gray-500 mb-1">イベント名</div>
                        <div className="font-semibold text-gray-900 mb-2">{event.title}</div>
                        <div className="text-sm text-gray-600 mb-2">{event.location}</div>
                        <div className="text-sm text-gray-600">{event.description}</div>
                      </div>
                      <div className="lg:col-span-1">
                        {event.participants && (
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-2">参加企業</div>
                            <div className="flex flex-wrap gap-1">
                              {event.participants.slice(0, 3).map((participant, pIndex) => (
                                <span key={pIndex} className="text-xs bg-white px-2 py-1 rounded text-gray-600">
                                  {participant}
                                </span>
                              ))}
                              {event.participants.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{event.participants.length - 3}社
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
