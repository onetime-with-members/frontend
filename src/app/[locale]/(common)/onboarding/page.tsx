import { Metadata } from 'next';
import { Locale } from 'next-intl';

import OnboardingPage from './onboarding';
import { redirect } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'onboarding' });

  return {
    title: t('onboarding'),
  };
}

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ name: string; register_token: string }>;
  params: Promise<{ locale: string }>;
}) {
  const { name, register_token } = await searchParams;
  const { locale } = await params;

  if (!name || !register_token) {
    redirect({ href: '/login', locale });
  }

  return <OnboardingPage name={name} registerToken={register_token} />;
}
