'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Member, ContentDetail, fetchMemberProfile, fetchMembers } from '../../utils';
import { pickMemberImage } from '../../utils';
import { resolveAssetUrl } from '../../utils';

interface MemberDetailProps {
  slug: string;
}

export const MemberDetail: React.FC<MemberDetailProps> = ({ slug }) => {
  const [member, setMember] = useState<Member | null>(null);
  const [detail, setDetail] = useState<ContentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMemberDetail = async () => {
      try {
        setLoading(true);

        // Load both CSV data and markdown detail
        const [members, detailData] = await Promise.all([
          fetchMembers(),
          fetchMemberProfile(slug)
        ]);

        const memberData = members.find(m => m.slug === slug);
        if (!memberData) {
          throw new Error('Member not found');
        }

        setMember(memberData);
        setDetail(detailData);
      } catch (err) {
        setError('メンバー詳細の読み込みに失敗しました');
        console.error('Error loading member detail:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMemberDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="animate-pulse">
        {/* Profile Header skeleton */}
        <div className="text-center mb-8 pb-8 border-b border-gray-200">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-full mx-auto mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-6 bg-gray-200 rounded w-48 mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !member || !detail) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || 'メンバーが見つかりませんでした'}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-gray-900 hover:underline"
        >
          再読み込み
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <header className="text-center mb-8 pb-8 border-b border-gray-200">
        {/* Profile Image */}
        <img
          src={pickMemberImage(member, 160)}
          alt={`${member.name} のプロフィール画像`}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-6 object-cover"
          loading="lazy"
        />

        {/* Name and Role */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {member.name}
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 font-medium mb-6">
          {member.role}
        </p>

        {/* Member Type Badge */}
        <div className="flex justify-center mb-6">
          {member.type === 'leader' && (
            <span className="bg-gray-900 text-white text-sm px-4 py-2 rounded-full">
              代表
            </span>
          )}
          {member.type === 'member' && (
            <span className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-full">
              運営メンバー
            </span>
          )}
          {member.type === 'advisor' && (
            <span className="bg-blue-100 text-blue-700 text-sm px-4 py-2 rounded-full">
              アドバイザー
            </span>
          )}
        </div>

        {/* Member Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
          {member.specialty && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                専門分野
              </h3>
              <p className="text-base text-gray-900">
                {member.specialty}
              </p>
            </div>
          )}

          {member.affiliation && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                所属
              </h3>
              <p className="text-base text-gray-900">
                {member.affiliation}
              </p>
            </div>
          )}

          {member.twitter && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Twitter
              </h3>
              <a
                href={`https://x.com/${member.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-blue-600 hover:text-blue-700 "
              >
                {member.twitter}
              </a>
            </div>
          )}

          {member.email && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Email
              </h3>
              <a
                href={`mailto:${member.email}`}
                className="text-base text-blue-600 hover:text-blue-700 "
              >
                {member.email}
              </a>
            </div>
          )}
        </div>

        {/* Short Bio */}
        <p className="text-gray-600 leading-relaxed mt-6 max-w-2xl mx-auto">
          {member.bio}
        </p>
      </header>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-6 mb-3">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mt-4 mb-2">
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p className="text-gray-700 leading-relaxed mb-4">
                {children}
              </p>
            ),
            img: (props) => {
              const { src, alt } = props as any;
              return (
                <img
                  src={resolveAssetUrl(src) as string}
                  alt={alt as string}
                  className="w-full h-auto rounded-lg my-4"
                  loading="lazy"
                />
              );
            },
            a: ({ href, children }) => (
              <a href={href as string} className="text-blue-600 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="leading-relaxed">{children}</li>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-900">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic">{children}</em>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                {children}
              </blockquote>
            ),
            code: ({ children }) => (
              <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                {children}
              </pre>
            ),
            hr: () => (
              <hr className="border-gray-200 my-8" />
            ),
          }}
        >
          {detail.content}
        </ReactMarkdown>
      </div>
    </article>
  );
};