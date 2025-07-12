import EventCreatePage from './event-create';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('createEvent');

  return {
    title: `${t('createEvent')} | OneTime`,
  };
}

export default async function EventCreate() {
  return <EventCreatePage />;
}
