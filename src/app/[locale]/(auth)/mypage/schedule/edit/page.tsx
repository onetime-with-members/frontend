import { Metadata } from 'next';
import { Locale } from 'next-intl';

import MyScheduleEditPage from '@/features/my-schedule/pages/MyScheduleEditPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'myScheduleEdit' });

  return {
    title: t('myScheduleEdit'),
  };
}

export default async function MyScheduleEdit() {
  return <MyScheduleEditPage />;
}
