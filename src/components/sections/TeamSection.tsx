'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Section, Button } from '../ui';
import { Member, fetchMembers, filterActiveItems, sortByOrder, getMemberImage } from '../../utils';

export const TeamSection: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  // Show only leader + 4 members + 1 advisor on home page
  const leaders = members.filter(m => m.type === 'leader');
  const regularMembers = members.filter(m => m.type === 'member').slice(0, 4);
  const advisors = members.filter(m => m.type === 'advisor').slice(0, 1);

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
      <div className={`bg-white p-6 md:p-8 rounded-lg shadow-sm ${isLeader ? 'border-2 border-gray-900' : ''}`}>
        <div className="text-center mb-3 md:mb-4">
          <img
            src={getMemberImage(member.slug, 128)}
            alt={`${member.name} のプロフィール画像`}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 md:mb-4 object-cover"
            loading="lazy"
          />
          <h4 className="text-base sm:text-lg font-semibold text-gray-900">
            {member.name}
          </h4>
          <p className="text-sm sm:text-base text-gray-600 font-medium">{member.role}</p>
          {member.affiliation && <p className="text-xs sm:text-sm text-gray-500">{member.affiliation}</p>}
          {member.specialty && <p className="text-xs sm:text-sm text-gray-500 mt-1">{member.specialty}</p>}
        </div>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-center mb-4">
          {member.bio}
        </p>
        {isLeader && (
          <div className="text-center mb-3">
            <span className="inline-block bg-gray-900 text-white text-xs px-3 py-1 rounded-full">
              代表
            </span>
          </div>
        )}
        {socialLinks.length > 0 && (
          <div className="flex justify-center space-x-3 pt-2">
            {socialLinks.map((link) => (
              <a
                key={link.type}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
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

  return (
    <Section id="team" background="gray">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 px-4 unique-header">
            運営メンバー
          </h2>
          <div className="decorative-divider"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            多様なバックグラウンドを持つメンバーが、それぞれの専門性を活かしてWeCreate3の活動を支えています。
          </p>
        </div>

        {loading ? (
          <div className="animate-pulse px-4">
            {/* Leader skeleton */}
            <div className="mb-12">
              <div className="h-6 bg-gray-200 rounded w-24 mx-auto mb-6"></div>
              <div className="max-w-sm mx-auto">
                <div className="bg-gray-200 h-64 rounded-lg"></div>
              </div>
            </div>
            {/* Members skeleton */}
            <div className="mb-12">
              <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* リーダー */}
            {leaders.length > 0 && (
              <div className="mb-12 md:mb-16 px-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 md:mb-8 text-center">
                  代表
                </h3>
                <div className="max-w-sm sm:max-w-md mx-auto">
                  <MemberCard member={leaders[0]} isLeader={true} />
                </div>
              </div>
            )}

            {/* 運営メンバー */}
            {regularMembers.length > 0 && (
              <div className="mb-12 md:mb-16 px-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 md:mb-8 text-center">
                  運営メンバー
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {regularMembers.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            )}

            {/* アドバイザー */}
            {advisors.length > 0 && (
              <div className="mb-8 px-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 md:mb-8 text-center">
                  アドバイザー
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
                  {advisors.map((advisor) => (
                    <MemberCard key={advisor.id} member={advisor} />
                  ))}
                </div>
              </div>
            )}

            {/* View More Button */}
            {members.length > 6 && (
              <div className="text-center mt-8 px-4">
                <Button
                  variant="unique"
                  size="md"
                  href="/team/"
                >
                  すべてのメンバーを見る
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Section>
  );
};
