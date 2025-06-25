import { SocialLoginButton, SocialLoginCallback } from './social-login';
import NavBar from '@/components/nav-bar';
import { auth, currentUser } from '@/lib/auth-action';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export type SocialLoginType = 'naver' | 'kakao' | 'google';

export async function generateMetadata() {
  const t = await getTranslations('login');

  return {
    title: `${t('login')} | OneTime`,
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

  const lastLogin = cookieStore.get('last-login')?.value as SocialLoginType;

  const user = (await auth()) ? (await currentUser()).user : null;

  const t = await getTranslations('login');

  return (
    <>
      {/* Callback */}
      <SocialLoginCallback
        searchParams={{
          accessToken: searchParams?.access_token,
          refreshToken: searchParams?.refresh_token,
          redirectUrl: searchParams?.redirect_url,
        }}
        cookies={{
          redirectUrl: cookieStore.get('redirect-url') as string | undefined,
        }}
      />

      {/* Page */}
      <div className="flex h-screen flex-col">
        {/* Navigation Bar */}
        <NavBar user={user} />

        {/* Main Content */}
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="mx-auto flex w-full max-w-[22rem] -translate-y-12 flex-col gap-12">
            {/* Logo Content */}
            <div className="flex flex-col items-center gap-4">
              <div className="text-primary-50 title-md-200">
                {t('logoTitle')}
              </div>
              <div>
                <Image
                  src="/images/logo-auth.svg"
                  alt="로그인 원타임 로고"
                  width={256}
                  height={52}
                  className="w-[16rem] object-cover"
                />
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex w-full flex-col gap-4">
              <SocialLoginButton
                provider="naver"
                lastLogin={lastLogin === 'naver'}
              />
              <SocialLoginButton
                provider="kakao"
                lastLogin={lastLogin === 'kakao'}
              />
              <SocialLoginButton
                provider="google"
                lastLogin={lastLogin === 'google'}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
