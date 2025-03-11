import EventCreatePage from './components/EventCreatePage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('createEvent');

  return {
    title: `${t('createEvent')} | OneTime`,
  };
}

export default function EventCreate() {
  return <EventCreatePage />;
}
