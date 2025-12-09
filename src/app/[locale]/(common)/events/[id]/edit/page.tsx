import { Metadata } from 'next';
import { Locale } from 'next-intl';

import { fetchEvent } from '@/features/event/api/event.api';
import { eventQueryOptions } from '@/features/event/api/event.option';
import EventEditPage from '@/features/event/pages/EventEditPage';
import { QueryClient } from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: Locale }>;
}): Promise<Metadata> {
  const { id: eventId, locale } = await params;
  const event = await fetchEvent(eventId);

  if (!event) {
    const t404 = await getTranslations({ locale, namespace: '404' });

    return {
      title: t404('notFound'),
    };
  }

  const t = await getTranslations({ locale, namespace: 'editEvent' });

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
