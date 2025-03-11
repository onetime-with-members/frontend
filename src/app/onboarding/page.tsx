import OnboardingPage from './components/OnboardingPage';
import { getTranslations } from 'next-intl/server';

{
  /* <Helmet>
  <title>{t('onboarding.onboarding')} | OneTime</title>
</Helmet>; */
}

export async function generateMetadata() {
  const t = await getTranslations('onboarding');

  return {
    title: `${t('onboarding')} | OneTime`,
  };
}

export default function Onboarding() {
  return <OnboardingPage />;
}
