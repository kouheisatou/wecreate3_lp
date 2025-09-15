'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Section, Button } from '../ui';
import { Activity, fetchActivities, filterActiveItems, sortByOrder } from '../../utils';

export const ActivitiesSection: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  // Show only first 3 activities on home page
  const displayedActivities = activities.slice(0, 3);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        const data = await fetchActivities();
        const activeActivities = filterActiveItems(data);
        const sortedActivities = sortByOrder(activeActivities);
        setActivities(sortedActivities);
      } catch (err) {
        console.error('Error loading activities:', err);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  return (
    <Section id="activities" background="gray">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 px-4">
            主な活動
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            WeCreate3では、学生の皆さんがWeb3とメタバースの世界で活躍できるよう、
            多角的なアプローチで支援を行っています。
          </p>
        </div>

        {loading ? (
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 px-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 px-4">
              {displayedActivities.map((activity) => (
                <div key={activity.id} className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                  <div className="mb-4 md:mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {activity.category}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                      <Link
                        href={`/activities/${activity.slug}`}
                        className="text-gray-900"
                      >
                        {activity.title}
                      </Link>
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {activity.description}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-2 md:mb-3 uppercase tracking-wide">
                      Key Features
                    </h4>
                    <div className="space-y-1.5 md:space-y-2">
                      {activity.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 md:mr-3 flex-shrink-0"></div>
                          <span className="text-xs sm:text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <Link
                      href={`/activities/${activity.slug}`}
                      className="text-sm text-gray-900 font-medium"
                    >
                      詳細を見る →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button */}
            {activities.length > 3 && (
              <div className="text-center mt-8 px-4">
                <Button
                  variant="unique"
                  size="md"
                  href="/activities"
                >
                  すべての活動を見る
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
