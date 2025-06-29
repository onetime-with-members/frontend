import EventFormScreen from '@/components/event/form-screen';
import { fetchEvent } from '@/lib/data';
import { getTranslations } from 'next-intl/server';
import { notFound, redirect } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: eventId } = await params;
  const event = await fetchEvent(eventId);

  const t404 = await getTranslations('404');

  if (!event) {
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
  const event = await fetchEvent(eventId);

  if (!event) {
    notFound();
  }

  if (event.event_status !== 'CREATOR') {
    redirect(`/events/${eventId}`);
  }

  return (
    <EventFormScreen
      type="edit"
      originData={{
        title: event.title,
        start_time: event.start_time,
        end_time: event.end_time,
        category: event.category,
        ranges: event.ranges,
      }}
    />
  );
}
