import { Metadata } from 'next';

import LoginPage from './login';
import { redirect } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export type SocialLoginType = 'naver' | 'kakao' | 'google';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('login');

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
