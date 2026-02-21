import { Metadata } from 'next';
import { Locale } from 'next-intl';

import OnboardingContextProvider from '@/features/user/contexts/OnboardingContext';
import OnboardingPage from '@/features/user/pages/OnboardingPage';
import { redirect } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'user.pages.OnboardingPage',
  });

  return {
    title: t('onboarding'),
  };
}

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ name: string; register_token: string }>;
  params: Promise<{ locale: Locale }>;
}) {
  const { name, register_token: registerToken } = await searchParams;
  const { locale } = await params;

  if (!name || !registerToken) {
    redirect({ href: '/login', locale });
  }

  return (
    <OnboardingContextProvider name={name} registerToken={registerToken}>
      <OnboardingPage />
    </OnboardingContextProvider>
  );
}
