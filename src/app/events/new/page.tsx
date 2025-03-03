import EventCreateScreen from './components/EventCreateScreen/EventCreateScreen';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('createEvent');

  return {
    title: `${t('createEvent')} | OneTime`,
  };
}

export default function EventCreatePage() {
  return <EventCreateScreen />;
}
