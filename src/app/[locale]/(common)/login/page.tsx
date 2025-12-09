import { Metadata } from 'next';
import { Locale } from 'next-intl';

import LoginPage from './login';
import { redirect } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export type SocialLoginType = 'naver' | 'kakao' | 'google';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'login' });

  return {
    title: t('login'),
  };
}

export default async function Page(props: {
  searchParams?: Promise<{
    register_token?: string;
    name?: string;
  }>;
  params: Promise<{ locale: string }>;
}) {
  const searchParams = await props.searchParams;
  const { locale } = await props.params;

  if (searchParams?.register_token && searchParams?.name) {
    const urlSearchParams = new URLSearchParams({
      register_token: searchParams.register_token,
      name: searchParams.name,
    });
    redirect({ href: `/onboarding?${urlSearchParams.toString()}`, locale });
  }

  return <LoginPage />;
}
