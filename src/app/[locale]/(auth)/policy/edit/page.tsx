import { Metadata } from 'next';

import PolicyEditPage from '@/features/user/pages/PolicyEditPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('policyEdit');

  return {
    title: t('agreeToTerms'),
  };
}

export default async function Page() {
  return <PolicyEditPage />;
}
