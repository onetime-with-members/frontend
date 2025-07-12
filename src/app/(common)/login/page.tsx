import LoginPage from './social-login';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type SocialLoginType = 'naver' | 'kakao' | 'google';

export async function generateMetadata() {
  const t = await getTranslations('login');

  return {
    title: t('login'),
  };
}

export default async function Page(props: {
  searchParams?: Promise<{
    redirect_url?: string;
    register_token?: string;
    name?: string;
    access_token?: string;
    refresh_token?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const cookieStore = await cookies();

  if (searchParams?.register_token && searchParams?.name) {
    const urlSearchParams = new URLSearchParams({
      register_token: searchParams.register_token,
      name: searchParams.name,
    });
    redirect(`/onboarding?${urlSearchParams.toString()}`);
  }

  return (
    <LoginPage
      searchParams={{
        accessToken: searchParams?.access_token,
        refreshToken: searchParams?.refresh_token,
        redirectUrl: searchParams?.redirect_url,
      }}
      cookies={{
        redirectUrl: cookieStore.get('redirect-url')?.value as
          | string
          | undefined,
        lastLogin: cookieStore.get('last-login')?.value as
          | SocialLoginType
          | undefined,
      }}
    />
  );
}
