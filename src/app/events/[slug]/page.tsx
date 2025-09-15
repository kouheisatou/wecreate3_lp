import React from 'react';
import Link from 'next/link';
import { Container, Section } from '../../../components/ui';
import { EventDetail } from '../../../components/details';

interface EventDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all events
export async function generateStaticParams() {
  // For static export, we need to define all possible slug values
  return [
    { slug: '2025-web3-ai-meeting' },
    { slug: '2023-student-meeting-2' },
    { slug: '2023-student-meeting-3' },
    { slug: '2023-hr3-hackathon' },
    { slug: '2023-kyoto-meeting' },
    { slug: '2023-web3-study-session' },
  ];
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;

  return (
    <div className="min-h-screen pt-20">
      <Section>
        <Container>
          <div className="mb-8">
            <Link
              href="/events"
              className="text-gray-600 hover:text-gray-900 "
            >
              ← イベント一覧に戻る
            </Link>
          </div>

          <EventDetail slug={slug} />
        </Container>
      </Section>
    </div>
  );
}