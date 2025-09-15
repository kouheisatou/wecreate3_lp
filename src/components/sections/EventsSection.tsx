'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Section, Button } from '../ui';
import { Event, fetchEvents, filterActiveItems, sortByDate, getEventImage } from '../../utils';

interface EventItem {
  date: string;
  title: string;
  location: string;
  description: string;
  participants?: string[];
}

interface YearGroup {
  year: string;
  items: EventItem[];
}

export const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Show only first 4 events on home page
  const displayedEvents = events.slice(0, 4);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await fetchEvents();
        const activeEvents = filterActiveItems(data);
        const sortedEvents = sortByDate(activeEvents);
        setEvents(sortedEvents);
      } catch (err) {
        console.error('Error loading events:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <Section id="events">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 px-4 unique-header">
            イベント実績
          </h2>
          <div className="decorative-divider"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            これまでに多くの大規模イベントを成功に導き、学生と業界のプロフェッショナルを繋ぐ場を提供してきました。
          </p>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-6 px-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-40 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <>
            {/* Recent Events */}
            <div className="space-y-4 md:space-y-6 mb-12 md:mb-16 px-4">
              {displayedEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden p-4 md:p-6">
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
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-xs sm:text-sm font-medium text-gray-500">
                          {new Date(event.date).toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        {event.featured && (
                          <span className="inline-block bg-yellow-100 text-yellow-800 text-[10px] sm:text-xs px-2 py-0.5 rounded-full">
                            注目
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">
                        <Link href={`/events/${event.slug}`} className="text-gray-900 hover:text-gray-700">
                          {event.title}
                        </Link>
                      </h3>

                      <div className="text-xs sm:text-sm text-gray-600 mb-1 line-clamp-1">
                        {event.location}
                      </div>

                      <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                        {event.description}
                      </p>

                      {event.participants && event.participants.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
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
              ))}
            </div>

            {/* View More Button */}
            {events.length > 4 && (
              <div className="text-center mt-8 px-4">
                <Button
                  variant="unique"
                  size="md"
                  href="/events/"
                >
                  すべてのイベントを見る
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
