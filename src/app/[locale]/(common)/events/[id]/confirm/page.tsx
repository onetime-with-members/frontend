import { Locale } from 'next-intl';

import { fetchEvent } from '@/features/event/api/event.api';
import {
  eventQueryOptions,
  recommendedTimesQueryOptions,
} from '@/features/event/api/event.option';
import { ConfirmedTimeProvider } from '@/features/event/contexts/ConfirmedTimeContext';
import EventConfirmPage from '@/features/event/pages/EventConfirmPage';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: Locale }>;
}): Promise<Metadata> {
  const { id: eventId, locale } = await params;

  const event = await fetchEvent(eventId);

  if (!event) {
    const t = await getTranslations({
      locale,
      namespace: 'setUp.pages.NotFoundPage',
    });

    return {
      title: t('notFound'),
    };
  }

  const t = await getTranslations({
    locale,
    namespace: 'event.pages.EventConfirmPage',
  });

  return {
    title: t('metaTitle', {
      name: event?.title || '',
    }),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: eventId } = await params;

  const queryClient = new QueryClient();

  const event = await queryClient.fetchQuery(eventQueryOptions(eventId));

  if (!event) {
    notFound();
  }

  await queryClient.prefetchQuery(eventQueryOptions(eventId));
  await queryClient.prefetchQuery(recommendedTimesQueryOptions(eventId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ConfirmedTimeProvider>
        <EventConfirmPage />
      </ConfirmedTimeProvider>
    </HydrationBoundary>
  );
}
