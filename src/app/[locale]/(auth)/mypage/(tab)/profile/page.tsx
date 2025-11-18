import { Metadata } from 'next';

import ProfilePage from '@/features/user/pages/ProfilePage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('profile');

  return {
    title: t('profile'),
  };
}

export default function Page() {
  return <ProfilePage />;
}
