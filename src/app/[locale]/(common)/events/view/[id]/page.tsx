import { Metadata } from 'next';
import { Locale } from 'next-intl';

import { bannerQueryOptions } from '@/features/banner/api/banner.options';
import { fetchEvent } from '@/features/event/api/event.api';
import {
  eventQueryOptions,
  eventShortUrlQueryOptions,
  participantsQueryOptions,
  qrCodeQueryOptions,
  recommendedTimesQueryOptions,
} from '@/features/event/api/event.option';
import EventParticipantFilterContextProvider from '@/features/event/contexts/EventParticipantFilterContext';
import { exampleEventList } from '@/features/event/mocks/example-events';
import EventDetailPage from '@/features/event/pages/EventDetailPage';
import { foundExampleEvent } from '@/features/event/utils';
import { schedulesQueryOptions } from '@/features/schedule/api/schedule.option';
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
  params: Promise<{ id: string; locale: Locale }>;
}): Promise<Metadata> {
  const { id, locale } = await params;

  const event = foundExampleEvent(id)?.event ?? (await fetchEvent(id));

  if (!event) {
    const t = await getTranslations({
      locale,
      namespace: 'setUp.pages.NotFoundPage',
    });

    return {
      title: t('notFound'),
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

export function generateStaticParams() {
  return exampleEventList.map(({ slug }) => ({ id: slug }));
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

  const headerList = await headers();
  const origin = headerList.get('x-origin') ?? '';
  const pathname = headerList.get('x-pathname') ?? '';

  await queryClient.prefetchQuery(eventQueryOptions(eventId));
  await queryClient.prefetchQuery(eventShortUrlQueryOptions(origin + pathname));
  await queryClient.prefetchQuery(recommendedTimesQueryOptions(eventId));
  await queryClient.prefetchQuery(qrCodeQueryOptions(eventId));
  await queryClient.prefetchQuery(participantsQueryOptions(eventId));
  await queryClient.prefetchQuery(schedulesQueryOptions(event));
  await queryClient.prefetchQuery(bannerQueryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventParticipantFilterContextProvider>
        <EventDetailPage />
      </EventParticipantFilterContextProvider>
    </HydrationBoundary>
  );
}
