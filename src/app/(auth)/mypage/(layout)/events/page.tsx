import MyEventsPage from './components/MyEventsPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('mypage');

  return {
    title: `${t('allEvents')} | OneTime`,
  };
}

export default function MyEvents() {
  return <MyEventsPage />;
}
