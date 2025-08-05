import PolicyEditPage from './policy-edit';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('policyEdit');

  return {
    title: t('agreeToTerms'),
  };
}

export default async function Page() {
  return <PolicyEditPage />;
}
