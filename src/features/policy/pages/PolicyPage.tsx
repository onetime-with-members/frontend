import { Metadata } from 'next';

import PolicyEdit from '../components/PolicyEdit';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('policyEdit');

  return {
    title: t('agreeToTerms'),
  };
}

export default async function Page() {
  return <PolicyEdit />;
}
