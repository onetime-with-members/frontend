import { Metadata } from 'next';
import { Locale } from 'next-intl';

import MyEventListPage from '@/features/user/pages/MyEventListPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'user.layouts.MyPageLayout',
  });

  return {
    title: t('allEvents'),
  };
}

export default async function Page() {
  return <MyEventListPage />;
}
