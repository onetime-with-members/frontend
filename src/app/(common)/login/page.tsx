import { Suspense } from 'react';

import LoginPage from './components/LoginPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('login');

  return {
    title: `${t('login')} | OneTime`,
  };
}

export default async function Login() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}
