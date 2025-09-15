'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Event, ContentDetail, fetchEventDetail, fetchEvents } from '../../utils';
import { pickEventImage } from '../../utils';
import { resolveAssetUrl } from '../../utils';

interface EventDetailProps {
  slug: string;
}

export const EventDetail: React.FC<EventDetailProps> = ({ slug }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [detail, setDetail] = useState<ContentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEventDetail = async () => {
      try {
        setLoading(true);

        // Load both CSV data and markdown detail
        const [events, detailData] = await Promise.all([
          fetchEvents(),
          fetchEventDetail(slug)
        ]);

        const eventData = events.find(e => e.slug === slug);
        if (!eventData) {
          throw new Error('Event not found');
        }

        setEvent(eventData);
        setDetail(detailData);
      } catch (err) {
        setError('イベント詳細の読み込みに失敗しました');
        console.error('Error loading event detail:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEventDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <div className="h-48 bg-gray-200 rounded w-full mb-6"></div>
          <div className="flex gap-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-full"></div>
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

  if (error || !event || !detail) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || 'イベントが見つかりませんでした'}</p>
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
          src={pickEventImage(event, detail)}
          alt={`${event.title} のサムネイル`}
          className="w-full h-56 md:h-64 object-cover rounded-lg mb-6"
          loading="lazy"
        />
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {event.year}年
          </span>
          {event.featured && (
            <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              注目イベント
            </span>
          )}
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-500">
            {new Date(event.updated_at).toLocaleDateString('ja-JP')} 更新
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {event.title}
        </h1>

        {/* Event Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              開催日
            </h3>
            <p className="text-lg font-semibold text-gray-900">
              {new Date(event.date).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              会場
            </h3>
            <p className="text-lg text-gray-900">
              {event.location}
            </p>
          </div>

          {event.participants && event.participants.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                参加企業・組織
              </h3>
              <div className="flex flex-wrap gap-1">
                {event.participants.map((participant, index) => (
                  <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                    {participant}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="text-lg text-gray-600 leading-relaxed">
          {event.description}
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