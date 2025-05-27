import { Metadata } from 'next';

import EventDetailPage from './components/EventDetailPage';
import { EventType } from '@/lib/types';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/events/${id}`,
  );

  const { payload: event }: { payload: EventType } = await res.json();

  const t404 = await getTranslations('404');

  if (!event) {
    return {
      title: `${t404('notFound')} | OneTime`,
    };
  }

  return {
    title: `${event?.title || ''} | OneTime`,
    openGraph: {
      title: `${event?.title || ''} | OneTime`,
      description:
        '링크로 접속해 자신의 스케줄을 등록하고 모두가 맞는 시간을 찾으세요.',
      images: '/images/opengraph/opengraph-thumbnail.png',
      siteName: 'OneTime',
    },
  };
}

export default async function EventDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/events/${id}`,
  );

  const { payload: event }: { payload: EventType } = await res.json();

  if (!event) {
    return notFound();
  }

  return <EventDetailPage />;
}
