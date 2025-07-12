import EventEditPage from './event-edit';
import { fetchEvent } from '@/lib/api/data';
import { eventQueryOptions } from '@/lib/api/query-options';
import { QueryClient } from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: eventId } = await params;
  const event = await fetchEvent(eventId);

  if (!event) {
    const t404 = await getTranslations('404');

    return {
      title: `${t404('notFound')} | OneTime`,
    };
  }

  const t = await getTranslations('editEvent');

  return {
    title: `${t('editEvent', {
      name: event?.title || '',
    })} | OneTime`,
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
