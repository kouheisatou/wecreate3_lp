'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '../../components/ui';
import { Member, fetchMembers, filterActiveItems, sortByOrder, getMemberImage } from '../../utils';

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        setLoading(true);
        const data = await fetchMembers();
        const activeMembers = filterActiveItems(data);
        const sortedMembers = sortByOrder(activeMembers);
        setMembers(sortedMembers);
      } catch (err) {
        console.error('Error loading members:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  const getSocialLinks = (member: Member) => {
    const links = [];
    if (member.twitter) {
      links.push({
        type: 'twitter',
        url: `https://x.com/${member.twitter.replace('@', '')}`,
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        )
      });
    }
    if (member.github) {
      links.push({
        type: 'github',
        url: `https://github.com/${member.github.replace('@', '')}`,
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        )
      });
    }
    if (member.linkedin) {
      links.push({
        type: 'linkedin',
        url: `https://linkedin.com/in/${member.linkedin}`,
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        )
      });
    }
    if (member.website) {
      links.push({
        type: 'website',
        url: member.website,
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"/>
          </svg>
        )
      });
    }
    if (member.email) {
      links.push({
        type: 'email',
        url: `mailto:${member.email}`,
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        )
      });
    }
    return links;
  };

  const MemberCard: React.FC<{ member: Member; isLeader?: boolean }> = ({ member, isLeader = false }) => {
    const socialLinks = getSocialLinks(member);

    return (
      <div className={`bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 ${isLeader ? 'ring-2 ring-gray-900' : ''}`}>
        <div className="text-center mb-4">
          <img
            src={getMemberImage(member.slug, 160)}
            alt={`${member.name} のプロフィール画像`}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 object-cover"
            loading="lazy"
          />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
            {member.name}
          </h3>
          <p className="text-base text-gray-600 font-medium mb-1">{member.role}</p>
          {member.affiliation && <p className="text-sm text-gray-500 mb-1">{member.affiliation}</p>}
          {member.specialty && <p className="text-sm text-gray-500">{member.specialty}</p>}
          {isLeader && (
            <div className="mt-2">
              <span className="inline-block bg-gray-900 text-white text-xs px-3 py-1 rounded-full">
                代表
              </span>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-600 leading-relaxed text-center mb-4">
          {member.bio}
        </p>
        {socialLinks.length > 0 && (
          <div className="flex justify-center space-x-3 pt-2 border-t border-gray-100">
            {socialLinks.map((link) => (
              <a
                key={link.type}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                title={link.type}
              >
                {link.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  // メンバーをタイプ別にグループ化
  const leaders = members.filter(m => m.type === 'leader');
  const regularMembers = members.filter(m => m.type === 'member');
  const advisors = members.filter(m => m.type === 'advisor');

  return (
    <div className="py-8 md:py-16">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            運営メンバー一覧
          </h1>
          <div className="decorative-divider"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            多様なバックグラウンドを持つメンバーが、それぞれの専門性を活かしてWeCreate3の活動を支えています。
          </p>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-6">
                <div className="h-8 bg-gray-200 rounded w-32 mx-auto"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="bg-gray-200 h-80 rounded-lg"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">現在、表示可能なメンバー情報がありません。</p>
          </div>
        ) : (
          <div className="space-y-12 md:space-y-16">
            {/* リーダー */}
            {leaders.length > 0 && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 md:mb-12">
                  代表
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
                  {leaders.map((leader) => (
                    <MemberCard key={leader.id} member={leader} isLeader={true} />
                  ))}
                </div>
              </div>
            )}

            {/* 運営メンバー */}
            {regularMembers.length > 0 && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 md:mb-12">
                  運営メンバー
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {regularMembers.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            )}

            {/* アドバイザー */}
            {advisors.length > 0 && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 md:mb-12">
                  アドバイザー
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
                  {advisors.map((advisor) => (
                    <MemberCard key={advisor.id} member={advisor} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}