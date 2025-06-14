import OnboardingContent from './content';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('onboarding');

  return {
    title: `${t('onboarding')} | OneTime`,
  };
}

export default function Onboarding() {
  return <OnboardingContent />;
}
