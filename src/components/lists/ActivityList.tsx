'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Activity, fetchActivities, filterActiveItems, sortByOrder } from '../../utils';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => (
  <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
    <div className="mb-4 md:mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {activity.category}
        </span>
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
        <Link
          href={`/activities/${activity.slug}`}
          className="text-gray-900 hover:text-gray-700"
        >
          {activity.title}
        </Link>
      </h3>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
        {activity.description}
      </p>
    </div>

    <div className="mb-4">
      <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-2 md:mb-3 uppercase tracking-wide">
        Key Features
      </h4>
      <div className="space-y-1.5 md:space-y-2">
        {activity.features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 md:mr-3 flex-shrink-0"></div>
            <span className="text-xs sm:text-sm text-gray-600">{feature}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="pt-4 border-t border-gray-100">
      <Link
        href={`/activities/${activity.slug}`}
        className="text-sm text-gray-900 font-medium hover:text-gray-700"
      >
        詳細を見る →
      </Link>
    </div>
  </div>
);

export const ActivityList: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        const data = await fetchActivities();
        const activeActivities = filterActiveItems(data);
        const sortedActivities = sortByOrder(activeActivities);
        setActivities(sortedActivities);
      } catch (err) {
        setError('活動データの読み込みに失敗しました');
        console.error('Error loading activities:', err);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
            ))}
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

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">現在、公開されている活動はありません。</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
};