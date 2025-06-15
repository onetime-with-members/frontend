import OnboardingContent from './content';
import { auth, currentUser } from '@/lib/auth';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('onboarding');

  return {
    title: `${t('onboarding')} | OneTime`,
  };
}

export default async function Onboarding() {
  const user = (await auth()) ? await currentUser() : null;

  return <OnboardingContent user={user} />;
}
