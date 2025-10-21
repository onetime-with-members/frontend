import ProfileEditPage from '@/features/user/pages/ProfileEditPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('profileEdit');

  return {
    title: t('editProfile'),
  };
}

export default async function Page() {
  return <ProfileEditPage />;
}
