import { Metadata } from 'next';
import { Locale } from 'next-intl';

import { fetchEvent } from '@/features/event/api/event.api';
import { eventQueryOptions } from '@/features/event/api/event.option';
import EventEditPage from '@/features/event/pages/EventEditPage';
import { foundExampleEvent } from '@/features/event/utils';
import { QueryClient } from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: Locale }>;
}): Promise<Metadata> {
  const { id: eventId, locale } = await params;

  const event =
    foundExampleEvent(eventId)?.event ?? (await fetchEvent(eventId));

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
    namespace: 'event.pages.EventEditPage',
  });

  return {
    title: t('editEvent', {
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

  const event = await queryClient.fetchQuery({
    ...eventQueryOptions(eventId),
  });

  if (!event) {
    notFound();
  }

  return <EventEditPage eventId={eventId} />;
}
