import { Metadata } from 'next';

import EventDetailPage from './event-detail';
import EventParticipantFilterContextProvider from '@/contexts/event-participant-filter';
import { fetchEvent } from '@/features/events/api/events.api';
import { eventQueryOptions } from '@/features/events/api/events.option';
import {
  bannerQueryOptions,
  participantsQueryOptions,
  qrCodeQueryOptions,
  recommendedTimesQueryOptions,
  schedulesQueryOptions,
  shortenUrlQueryOptions,
} from '@/lib/api/query-options';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
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

  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const pathname = headersList.get('x-pathname') || '';

  await Promise.all([
    queryClient.prefetchQuery({
      ...shortenUrlQueryOptions(`${protocol}://${host}${pathname}`),
    }),
    queryClient.prefetchQuery({ ...recommendedTimesQueryOptions(eventId) }),
    queryClient.prefetchQuery({
      ...qrCodeQueryOptions(eventId),
    }),
    queryClient.prefetchQuery({
      ...schedulesQueryOptions(event),
    }),
    queryClient.prefetchQuery({
      ...participantsQueryOptions(eventId),
    }),
    queryClient.prefetchQuery({ ...bannerQueryOptions }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventParticipantFilterContextProvider>
        <EventDetailPage />
      </EventParticipantFilterContextProvider>
    </HydrationBoundary>
  );
}
