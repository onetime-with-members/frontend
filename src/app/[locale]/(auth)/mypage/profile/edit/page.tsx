import { Metadata } from 'next';
import { Locale } from 'next-intl';

import ProfileEditPage from '@/features/user/pages/ProfileEditPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'profileEdit' });

  return {
    title: t('editProfile'),
  };
}

export default async function Page() {
  return <ProfileEditPage />;
}
