import React from 'react';
import Link from 'next/link';
import { Container, Section } from '../../components/ui';
import { TeamList } from '../../components/lists';

export default function TeamPage() {
  return (
    <div className="min-h-screen pt-20">
      <Section>
        <Container>
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              運営メンバー
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              多様なバックグラウンドを持つメンバーが、それぞれの専門性を活かしてWeCreate3の活動を支えています。
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

          <TeamList />
        </Container>
      </Section>
    </div>
  );
}