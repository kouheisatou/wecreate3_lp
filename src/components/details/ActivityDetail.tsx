'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Activity, ContentDetail, fetchActivityDetail, fetchActivities, getActivityImage } from '../../utils';

interface ActivityDetailProps {
  slug: string;
}

export const ActivityDetail: React.FC<ActivityDetailProps> = ({ slug }) => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [detail, setDetail] = useState<ContentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadActivityDetail = async () => {
      try {
        setLoading(true);

        // Load both CSV data and markdown detail
        const [activities, detailData] = await Promise.all([
          fetchActivities(),
          fetchActivityDetail(slug)
        ]);

        const activityData = activities.find(a => a.slug === slug);
        if (!activityData) {
          throw new Error('Activity not found');
        }

        setActivity(activityData);
        setDetail(detailData);
      } catch (err) {
        setError('活動詳細の読み込みに失敗しました');
        console.error('Error loading activity detail:', err);
      } finally {
        setLoading(false);
      }
    };

    loadActivityDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <div className="h-48 bg-gray-200 rounded w-full mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
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

  if (error || !activity || !detail) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || '活動が見つかりませんでした'}</p>
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
      {/* Header */}
      <header className="mb-8 pb-8 border-b border-gray-200">
        <img
          src={getActivityImage(activity.slug, 1200, 630)}
          alt={`${activity.title} のサムネイル`}
          className="w-full h-56 md:h-64 object-cover rounded-lg mb-6"
          loading="lazy"
        />
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {activity.category}
          </span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-500">
            {new Date(activity.updated_at).toLocaleDateString('ja-JP')} 更新
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {activity.title}
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          {activity.description}
        </p>

        {/* Key Features */}
        {activity.features.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Key Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activity.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
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