import { Metadata } from 'next';
import { Locale } from 'next-intl';

import ProfilePage from '@/features/user/pages/ProfilePage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'profile' });

  return {
    title: t('profile'),
  };
}

export default function Page() {
  return <ProfilePage />;
}
