'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Section, Button } from '../ui';
import { Member, fetchMembers, filterActiveItems, sortByOrder } from '../../utils';

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

  const MemberCard: React.FC<{ member: Member; isLeader?: boolean }> = ({ member, isLeader = false }) => (
    <div className={`bg-white p-6 md:p-8 rounded-lg shadow-sm ${isLeader ? 'border-2 border-gray-900' : ''}`}>
      <div className="text-center mb-3 md:mb-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full mx-auto mb-3 md:mb-4"></div>
        <h4 className="text-base sm:text-lg font-semibold text-gray-900">
          <Link
            href={`/team/${member.slug}`}
            className="text-gray-900 hover:text-gray-700"
          >
            {member.name}
          </Link>
        </h4>
        <p className="text-sm sm:text-base text-gray-600 font-medium">{member.role}</p>
        {member.affiliation && <p className="text-xs sm:text-sm text-gray-500">{member.affiliation}</p>}
        {member.specialty && <p className="text-xs sm:text-sm text-gray-500 mt-1">{member.specialty}</p>}
        {member.twitter && (
          <a
            href={`https://x.com/${member.twitter.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-gray-600 mt-1 inline-block"
          >
            {member.twitter}
          </a>
        )}
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
      <div className="text-center">
        <Link
          href={`/team/${member.slug}`}
          className="text-sm text-gray-900 font-medium hover:text-gray-700"
        >
          詳細を見る →
        </Link>
      </div>
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
