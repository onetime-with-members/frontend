import ProfileEditPage from './profile-edit';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('profileEdit');

  return {
    title: `${t('editProfile')} | OneTime`,
  };
}

export default async function Page() {
  return <ProfileEditPage />;
}
