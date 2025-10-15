import MyEventsPage from './my-events';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('mypage');

  return {
    title: t('allEvents'),
  };
}

export default async function Page() {
  return <MyEventsPage />;
}
