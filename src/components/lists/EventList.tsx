'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Event, fetchEvents, filterActiveItems, groupEventsByYear } from '../../utils';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-4">
      <div className="lg:col-span-1">
        <div className="text-xs sm:text-sm font-medium text-gray-500 mb-1">日付</div>
        <div className="text-sm sm:text-base font-semibold text-gray-900">
          {new Date(event.date).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        {event.featured && (
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full mt-2">
            注目
          </span>
        )}
      </div>
      <div className="lg:col-span-2">
        <div className="text-xs sm:text-sm font-medium text-gray-500 mb-1">イベント名</div>
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
          <Link
            href={`/events/${event.slug}`}
            className="text-gray-900"
          >
            {event.title}
          </Link>
        </h3>
        <div className="text-xs sm:text-sm text-gray-600 mb-2">{event.location}</div>
        <div className="text-xs sm:text-sm text-gray-600 mb-3">{event.description}</div>
        <Link
          href={`/events/${event.slug}`}
          className="text-xs sm:text-sm text-gray-900 font-medium"
        >
          詳細を見る →
        </Link>
      </div>
      <div className="lg:col-span-1">
        {event.participants && event.participants.length > 0 && (
          <div>
            <div className="text-xs sm:text-sm font-medium text-gray-500 mb-2">参加企業</div>
            <div className="flex flex-wrap gap-1">
              {event.participants.slice(0, 3).map((participant, pIndex) => (
                <span key={pIndex} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
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