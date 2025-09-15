'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Event, fetchEvents, filterActiveItems, groupEventsByYear } from '../../utils';
import { getEventImage } from '../../utils';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden p-4 md:p-6">
    <div className="flex items-stretch gap-4">
      {/* 左：サムネイル */}
      <img
        src={getEventImage(event.slug, 480, 320)}
        alt={`${event.title} のサムネイル`}
        className="w-32 h-24 sm:w-40 sm:h-28 md:w-48 md:h-32 object-cover rounded flex-shrink-0"
        loading="lazy"
      />

      {/* 右：イベント情報 */}
      <div className="flex-1 min-w-0">
        <div className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
          {new Date(event.date).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">
          <Link
            href={`/events/${event.slug}`}
            className="text-gray-900 hover:text-gray-700"
          >
            {event.title}
          </Link>
        </h3>
        <div className="text-xs sm:text-sm text-gray-600 mb-1 line-clamp-1">{event.location}</div>
        <div className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{event.description}</div>
        {event.participants && event.participants.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {event.participants.slice(0, 3).map((participant, pIndex) => (
              <span key={pIndex} className="text-[10px] sm:text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                {participant}
              </span>
            ))}
            {event.participants.length > 3 && (
              <span className="text-[10px] sm:text-xs text-gray-500">
                +{event.participants.length - 3}社
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

interface YearSectionProps {
  yearData: { year: string; items: Event[] };
}

const YearSection: React.FC<YearSectionProps> = ({ yearData }) => (
  <div className="mb-8 md:mb-12">
    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 md:mb-8 text-center">
      {yearData.year}年
    </h3>
    <div className="space-y-4 md:space-y-6">
      {yearData.items.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  </div>
);

export const EventList: React.FC = () => {
  const [eventGroups, setEventGroups] = useState<{ year: string; items: Event[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await fetchEvents();
        const activeEvents = filterActiveItems(data);
        const groupedEvents = groupEventsByYear(activeEvents);
        setEventGroups(groupedEvents);
      } catch (err) {
        setError('イベントデータの読み込みに失敗しました');
        console.error('Error loading events:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse space-y-8">
          {[...Array(2)].map((_, i) => (
            <div key={i}>
              <div className="h-8 bg-gray-200 rounded w-32 mx-auto mb-6"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="bg-gray-200 h-32 rounded-lg"></div>
                ))}
              </div>
            </div>
          ))}
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

  if (eventGroups.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">現在、公開されているイベントはありません。</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 md:space-y-12">
      {eventGroups.map((yearData) => (
        <YearSection key={yearData.year} yearData={yearData} />
      ))}
    </div>
  );
};