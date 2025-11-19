import { Metadata } from 'next';

import OnboardingPage from './onboarding';
import { redirect } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('onboarding');

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
