import React from 'react';
import Link from 'next/link';
import { Container, Section } from '../../components/ui';
import { EventList } from '../../components/lists';

export default function EventsPage() {
  return (
    <div className="min-h-screen pt-20">
      <Section>
        <Container>
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              イベント実績
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              これまでに多くの大規模イベントを成功に導き、学生と業界のプロフェッショナルを繋ぐ場を提供してきました。
            </p>
          </div>

          <div className="mb-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 "
            >
              ← トップページに戻る
            </Link>
          </div>

          <EventList />
        </Container>
      </Section>
    </div>
  );
}