'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Member, fetchMembers, filterActiveItems, sortByOrder } from '../../utils';

interface MemberCardProps {
  member: Member;
  isLeader?: boolean;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, isLeader = false }) => (
  <div className={`bg-white p-6 md:p-8 rounded-lg shadow-sm ${isLeader ? 'border-2 border-gray-900' : ''}`}>
    <div className="text-center mb-3 md:mb-4">
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full mx-auto mb-3 md:mb-4"></div>
      <h4 className="text-base sm:text-lg font-semibold text-gray-900">
        <Link
          href={`/team/${member.slug}`}
          className="text-gray-900"
        >
          {member.name}
        </Link>
      </h4>
      <p className="text-sm sm:text-base text-gray-600 font-medium">{member.role}</p>
      {member.affiliation && (
        <p className="text-xs sm:text-sm text-gray-500">{member.affiliation}</p>
      )}
      {member.specialty && (
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{member.specialty}</p>
      )}
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
        className="text-sm text-gray-900 font-medium"
      >
        詳細を見る →
      </Link>
    </div>
  </div>
);

interface TeamSectionProps {
  title: string;
  members: Member[];
  type: 'leader' | 'member' | 'advisor';
}

const TeamSection: React.FC<TeamSectionProps> = ({ title, members, type }) => {
  if (members.length === 0) return null;

  const gridClass = type === 'leader'
    ? 'max-w-sm sm:max-w-md mx-auto'
    : type === 'advisor'
    ? 'grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6';

  return (
    <div className="mb-12 md:mb-16">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 md:mb-8 text-center">
        {title}
      </h3>
      <div className={gridClass}>
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            isLeader={type === 'leader'}
          />
        ))}
      </div>
    </div>
  );
};

export const TeamList: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        setLoading(true);
        const data = await fetchMembers();
        const activeMembers = filterActiveItems(data);
        const sortedMembers = sortByOrder(activeMembers);
        setMembers(sortedMembers);
      } catch (err) {
        setError('メンバーデータの読み込みに失敗しました');
        console.error('Error loading members:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse space-y-8">
          {/* Leader skeleton */}
          <div>
            <div className="h-6 bg-gray-200 rounded w-24 mx-auto mb-6"></div>
            <div className="max-w-sm mx-auto">
              <div className="bg-gray-200 h-64 rounded-lg"></div>
            </div>
          </div>
          {/* Members skeleton */}
          <div>
            <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-gray-600 mt-4">データを読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-gray-900 hover:underline"
        >
          再読み込み
        </button>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">現在、公開されているメンバー情報はありません。</p>
      </div>
    );
  }

  // Group members by type
  const leaders = members.filter(m => m.type === 'leader');
  const regularMembers = members.filter(m => m.type === 'member');
  const advisors = members.filter(m => m.type === 'advisor');

  return (
    <div>
      <TeamSection title="代表" members={leaders} type="leader" />
      <TeamSection title="運営メンバー" members={regularMembers} type="member" />
      <TeamSection title="アドバイザー" members={advisors} type="advisor" />
    </div>
  );
};