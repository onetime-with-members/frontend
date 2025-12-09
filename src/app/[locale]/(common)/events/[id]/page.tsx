import { Metadata } from 'next';
import { Locale } from 'next-intl';

import { fetchEvent } from '@/features/event/api/event.api';
import { eventQueryOptions } from '@/features/event/api/event.option';
import EventParticipantFilterContextProvider from '@/features/event/contexts/EventParticipantFilterContext';
import EventDetailPage from '@/features/event/pages/EventDetailPage';
import { QueryClient } from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: Locale }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const event = await fetchEvent(id);

  if (!event) {
    const t404 = await getTranslations({ locale, namespace: '404' });

    return {
      title: t404('notFound'),
    };
  }

  return {
    title: event.title || '',
    openGraph: {
      title: `${event.title || ''} | OneTime`,
      description:
        locale === 'ko'
          ? '링크로 접속해 자신의 가능한 시간을 등록하고 모두가 맞는 시간을 찾으세요.'
          : 'Go to the link to add your availability and find a time that works for everyone.',
      images: '/images/opengraph/opengraph-thumbnail.png',
      siteName: 'OneTime',
    },
    twitter: {
      title: `${event.title || ''} | OneTime`,
      description:
        locale === 'ko'
          ? '링크로 접속해 자신의 가능한 시간을 등록하고 모두가 맞는 시간을 찾으세요.'
          : 'Go to the link to add your availability and find a time that works for everyone.',
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
