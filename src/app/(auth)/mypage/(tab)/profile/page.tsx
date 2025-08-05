import ProfilePage from './profile';
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
