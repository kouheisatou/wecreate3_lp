import React from 'react';
import Link from 'next/link';
import { Container, Section } from '../../../components/ui';
import { MemberDetail } from '../../../components/details';

interface MemberDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all team members
export async function generateStaticParams() {
  // For static export, we need to define all possible slug values
  return [
    { slug: 'yano-taiga' },
    { slug: 'tanaka-taro' },
    { slug: 'sato-hanako' },
    { slug: 'suzuki-ichiro' },
    { slug: 'takahashi-misaki' },
    { slug: 'nakamura-kenta' },
    { slug: 'yamada-hakase' },
    { slug: 'hayashi-ceo' },
  ];
}

export default async function MemberDetailPage({ params }: MemberDetailPageProps) {
  const { slug } = await params;

  return (
    <div className="min-h-screen pt-20">
      <Section>
        <Container>
          <div className="mb-8">
            <Link
              href="/team"
              className="text-gray-600 hover:text-gray-900"
            >
              ← メンバー一覧に戻る
            </Link>
          </div>

          <MemberDetail slug={slug} />
        </Container>
      </Section>
    </div>
  );
}