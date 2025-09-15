import React from 'react';
import Link from 'next/link';
import { Container, Section } from '../../components/ui';
import { ActivityList } from '../../components/lists';

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen pt-20">
      <Section>
        <Container>
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              主な活動
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              WeCreate3では、学生の皆さんがWeb3とメタバースの世界で活躍できるよう、
              多角的なアプローチで支援を行っています。
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

          <ActivityList />
        </Container>
      </Section>
    </div>
  );
}