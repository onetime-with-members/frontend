import { Metadata } from 'next';
import { Locale } from 'next-intl';

import MyScheduleEverytimeEditPage from '@/features/my-schedule/pages/MyScheduleEverytimeEditPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'everytimeScheduleEdit',
  });

  return {
    title: t('title'),
  };
}

export default async function Page() {
  return <MyScheduleEverytimeEditPage />;
}
