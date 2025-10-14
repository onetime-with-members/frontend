import ProfilePage from '@/features/user/pages/ProfilePage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('profile');

  return {
    title: t('profile'),
  };
}

export default function Page() {
  return <ProfilePage />;
}
