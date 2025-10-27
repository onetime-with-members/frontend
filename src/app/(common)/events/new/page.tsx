import EventCreatePage from '@/features/event/pages/EventCreatePage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('createEvent');

  return {
    title: t('createEvent'),
  };
}

export default async function EventCreate() {
  return <EventCreatePage />;
}
