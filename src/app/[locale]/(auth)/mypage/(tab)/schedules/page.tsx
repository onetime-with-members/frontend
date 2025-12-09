import { Metadata } from 'next';
import { Locale } from 'next-intl';

import MySchedulePage from '@/features/my-schedule/pages/MySchedulePage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'mypage' });

  return {
    title: t('mySchedule'),
  };
}

export default async function Page() {
  return <MySchedulePage />;
}
