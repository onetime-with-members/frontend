import OnboardingPage from './onboarding';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

export async function generateMetadata() {
  const t = await getTranslations('onboarding');

  return {
    title: t('onboarding'),
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ name: string; register_token: string }>;
}) {
  const { name, register_token } = await searchParams;

  if (!name || !register_token) {
    redirect('/login');
  }

  return <OnboardingPage name={name} registerToken={register_token} />;
}
