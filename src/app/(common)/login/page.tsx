import { Metadata } from 'next';

import LoginPage from './login';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

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
}) {
  const searchParams = await props.searchParams;

  if (searchParams?.register_token && searchParams?.name) {
    const urlSearchParams = new URLSearchParams({
      register_token: searchParams.register_token,
      name: searchParams.name,
    });
    redirect(`/onboarding?${urlSearchParams.toString()}`);
  }

  return <LoginPage />;
}
