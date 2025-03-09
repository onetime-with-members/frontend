import EventEditPage from './components/EventEditPage';
import { EventType } from '@/types/event.type';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/events/${id}`,
  );

  const { payload: event }: { payload: EventType } = await res.json();

  const t = await getTranslations('editEvent');
  const t404 = await getTranslations('404');

  if (!event) {
    return {
      title: `${t404('notFound')} | OneTime`,
    };
  }

  return {
    title: `${t('editEvent', {
      name: event?.title || '',
    })} | OneTime`,
  };
}

export default async function EventEdit({
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

  return <EventEditPage />;
}
