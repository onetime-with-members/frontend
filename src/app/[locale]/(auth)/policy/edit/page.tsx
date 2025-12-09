import { Metadata } from 'next';
import { Locale } from 'next-intl';

import PolicyEditPage from '@/features/user/pages/PolicyEditPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'policyEdit' });

  return {
    title: t('agreeToTerms'),
  };
}

export default async function Page() {
  return <PolicyEditPage />;
}
