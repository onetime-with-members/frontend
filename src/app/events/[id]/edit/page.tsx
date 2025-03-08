import EventEditPage from './components/EventEditPage';
import { EventType } from '@/types/event.type';
import { getTranslations } from 'next-intl/server';

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

  return {
    title: `${t('editEvent', {
      name: event.title,
    })} | OneTime`,
  };
}

export default function EventEdit() {
  return <EventEditPage />;
}
