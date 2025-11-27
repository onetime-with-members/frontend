import { Metadata } from 'next';

import MyEventsPage from '@/features/user/pages/MyEventsPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('mypage');

  return {
    title: t('allEvents'),
  };
}

export default async function Page() {
  return <MyEventsPage />;
}
