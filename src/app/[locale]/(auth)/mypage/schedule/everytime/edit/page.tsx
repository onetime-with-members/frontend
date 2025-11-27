import { Metadata } from 'next';

import MyScheduleEverytimeEditPage from '@/features/my-schedule/pages/MyScheduleEverytimeEditPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('everytimeScheduleEdit');

  return {
    title: t('title'),
  };
}

export default async function Page() {
  return <MyScheduleEverytimeEditPage />;
}
