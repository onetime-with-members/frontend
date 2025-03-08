import ProfileEditPage from './components/ProfileEditPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('profileEdit');

  return {
    title: `${t('editProfile')} | OneTime`,
  };
}

export default function ProfileEdit() {
  return <ProfileEditPage />;
}
