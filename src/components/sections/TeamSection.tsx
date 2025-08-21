import React from 'react';
import { Section } from '../ui';

export const TeamSection: React.FC = () => {
  const leader = {
    name: '矢野 大雅',
    role: 'WeCreate3 代表',
    twitter: '@NFT_taiga',
    description: 'ダミー説明文です。',
  };

  const members = [
    {
      name: '田中 太郎',
      role: 'イベント企画責任者',
      specialty: 'イベントプロデュース、コミュニティマネジメント',
      description: 'ダミー説明文です。',
    },
    {
      name: '佐藤 花子',
      role: 'マーケティング・広報担当',
      specialty: 'デジタルマーケティング、SNS運用',
      description: 'ダミー説明文です。',
    },
    {
      name: '鈴木 一郎',
      role: '技術・開発担当',
      specialty: 'ブロックチェーン開発、スマートコントラクト',
      description: 'ダミー説明文です。',
    },
    {
      name: '高橋 美咲',
      role: 'パートナーシップ担当',
      specialty: '企業連携、ビジネス開発',
      description: 'ダミー説明文です。',
    },
    {
      name: '中村 健太',
      role: '教育・コンテンツ担当',
      specialty: '教育プログラム設計、コンテンツ制作',
      description: 'ダミー説明文です。',
    },
  ];

  const advisors = [
    {
      name: '山田 博士',
      affiliation: '某大学教授',
      specialty: 'ブロックチェーン技術、暗号学',
      description: 'ダミー説明文です。',
    },
    {
      name: '林 CEO',
      affiliation: 'Web3スタートアップ代表',
      specialty: '事業戦略、資金調達',
      description: 'ダミー説明文です。',
    },
  ];

  const MemberCard: React.FC<{
    name: string;
    role: string;
    specialty?: string;
    affiliation?: string;
    twitter?: string;
    description: string;
    isLeader?: boolean;
  }> = ({ name, role, specialty, affiliation, twitter, description, isLeader = false }) => (
    <div className={`bg-white p-4 md:p-6 rounded-lg shadow-sm ${isLeader ? 'border-2 border-gray-900' : ''}`}>
      <div className="text-center mb-3 md:mb-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full mx-auto mb-3 md:mb-4"></div>
        <h4 className="text-base sm:text-lg font-semibold text-gray-900">{name}</h4>
        <p className="text-sm sm:text-base text-gray-600 font-medium">{role}</p>
        {affiliation && <p className="text-xs sm:text-sm text-gray-500">{affiliation}</p>}
        {specialty && <p className="text-xs sm:text-sm text-gray-500 mt-1">{specialty}</p>}
        {twitter && (
          <a
            href={`https://x.com/${twitter.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors mt-1 inline-block touch-manipulation"
          >
            {twitter}
          </a>
        )}
      </div>
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-center">
        {description}
      </p>
      {isLeader && (
        <div className="mt-3 md:mt-4 text-center">
          <span className="inline-block bg-gray-900 text-white text-xs px-2 py-1 rounded">
            代表
          </span>
        </div>
      )}
    </div>
  );

  return (
    <Section id="team" background="gray">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 px-4">
            運営メンバー
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            多様なバックグラウンドを持つメンバーが、それぞれの専門性を活かしてWeCreate3の活動を支えています。
          </p>
        </div>

        {/* リーダー */}
        <div className="mb-12 md:mb-16 px-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 md:mb-8 text-center">
            代表
          </h3>
          <div className="max-w-sm sm:max-w-md mx-auto">
            <MemberCard
              name={leader.name}
              role={leader.role}
              twitter={leader.twitter}
              description={leader.description}
              isLeader={true}
            />
          </div>
        </div>

        {/* 運営メンバー */}
        <div className="mb-12 md:mb-16 px-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 md:mb-8 text-center">
            運営メンバー
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {members.map((member, index) => (
              <MemberCard
                key={index}
                name={member.name}
                role={member.role}
                specialty={member.specialty}
                description={member.description}
              />
            ))}
          </div>
        </div>

        {/* アドバイザー */}
        <div className="px-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 md:mb-8 text-center">
            アドバイザー
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {advisors.map((advisor, index) => (
              <MemberCard
                key={index}
                name={advisor.name}
                role="アドバイザー"
                affiliation={advisor.affiliation}
                specialty={advisor.specialty}
                description={advisor.description}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
