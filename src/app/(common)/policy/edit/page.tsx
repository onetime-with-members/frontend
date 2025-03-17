import PolicyEditPage from './components/PolicyEditPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('policyEdit');

  return {
    title: `${t('agreeToTerms')} | OneTime`,
  };
}

export default function PolicyEdit() {
  return <PolicyEditPage />;
}
