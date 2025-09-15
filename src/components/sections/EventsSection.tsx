'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Section, Button } from '../ui';
import { Event, fetchEvents, filterActiveItems, sortByDate } from '../../utils';

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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 px-4">
            イベント実績
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            これまでに多くの大規模イベントを成功に導き、学生と業界のプロフェッショナルを繋ぐ場を提供してきました。
          </p>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-6 px-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <>
            {/* Recent Events */}
            <div className="space-y-4 md:space-y-6 mb-12 md:mb-16 px-4">
              {displayedEvents.map((event) => (
                <div key={event.id} className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
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
