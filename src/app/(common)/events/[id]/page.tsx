import { Metadata } from 'next';

import EventParticipantFilterContextProvider from '@/contexts/event-participant-filter';
import { fetchEvent } from '@/features/event/api/events.api';
import { eventQueryOptions } from '@/features/event/api/events.option';
import EventDetailPage from '@/features/event/pages/EventDetailPage';
import { QueryClient } from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = await fetchEvent(id);

  if (!event) {
    const t404 = await getTranslations('404');

    return {
      title: t404('notFound'),
    };
  }

  return {
    title: event.title || '',
    openGraph: {
      title: `${event.title || ''} | OneTime`,
      description:
        '링크로 접속해 자신의 스케줄을 등록하고 모두가 맞는 시간을 찾으세요.',
      images: '/images/opengraph/opengraph-thumbnail.png',
      siteName: 'OneTime',
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: eventId } = await params;

  const queryClient = new QueryClient();

  const event = await queryClient.fetchQuery({
    ...eventQueryOptions(eventId),
  });

  if (!event) notFound();

  return (
    <EventParticipantFilterContextProvider>
      <EventDetailPage />
    </EventParticipantFilterContextProvider>
  );
}
