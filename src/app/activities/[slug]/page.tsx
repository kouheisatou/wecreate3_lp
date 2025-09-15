import React from 'react';
import Link from 'next/link';
import { Container, Section } from '../../../components/ui';
import { ActivityDetail } from '../../../components/details';

interface ActivityDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all activities
export async function generateStaticParams() {
  // For static export, we need to define all possible slug values
  return [
    { slug: 'event-planning' },
    { slug: 'education' },
    { slug: 'community' },
    { slug: 'research-development' },
  ];
}

export default async function ActivityDetailPage({ params }: ActivityDetailPageProps) {
  const { slug } = await params;

  return (
    <div className="min-h-screen pt-20">
      <Section>
        <Container>
          <div className="mb-8">
            <Link
              href="/activities"
              className="text-gray-600 hover:text-gray-900 "
            >
              ← 活動一覧に戻る
            </Link>
          </div>

          <ActivityDetail slug={slug} />
        </Container>
      </Section>
    </div>
  );
}