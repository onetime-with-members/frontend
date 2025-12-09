'use client';

import { getCookie, setCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { SocialLoginType } from './page';
import NavBar from '@/components/NavBar';
import { REDIRECT_URL } from '@/features/auth/constants';
import useHomeUrl from '@/features/home/hooks/useHomeUrl';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth';
import cn from '@/lib/cn';
import { useProgressRouter } from '@/navigation';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const t = useTranslations('login');
  const searchParams = useSearchParams();

  const progressRouter = useProgressRouter();
  const homeUrl = useHomeUrl();
  const { isLoggedIn, signIn } = useAuth();

  const searchParamsData = {
    accessToken: searchParams.get('access_token'),
    refreshToken: searchParams.get('refresh_token'),
    redirectUrl: searchParams.get('redirect_url'),
  };
  const isLoggingIn =
    searchParamsData.accessToken && searchParamsData.refreshToken;

  useEffect(() => {
    (async () => {
      if (searchParamsData.redirectUrl) {
        await setCookie(REDIRECT_URL, searchParamsData.redirectUrl);
      }
    })();
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      if (isLoggingIn || isLoggedIn) {
        if (isLoggingIn) {
          await signIn({
            accessToken: searchParamsData.accessToken as string,
            refreshToken: searchParamsData.refreshToken as string,
          });
        }
        progressRouter.replace(
          searchParamsData.redirectUrl ||
            (await getCookie('redirect-url')) ||
            homeUrl,
        );
      }
    })();
  }, [searchParams, isLoggedIn]);

  return (
    <div className="flex h-screen flex-col" data-testid="login-page">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="mx-auto flex w-full max-w-[22rem] -translate-y-12 flex-col gap-12">
          {/* Logo Content */}
          <div className="flex flex-col items-center gap-4">
            <div className="text-primary-50 title-md-200">{t('logoTitle')}</div>
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
            <SocialLoginButton provider="naver" />
            <SocialLoginButton provider="kakao" />
            <SocialLoginButton provider="google" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SocialLoginCallback() {
  return null;
}

export function SocialLoginButton({
  provider,
  ...props
}: {
  provider: SocialLoginType;
}) {
  const [isLastLogin, setIsLastLogin] = useState<boolean>(false);

  const t = useTranslations('login');

  useEffect(() => {
    async function lastLogin() {
      const lastLoginCookie = await getCookie('last-login');
      setIsLastLogin(lastLoginCookie === provider);
    }
    lastLogin();
  }, []);

  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_SERVER_OAUTH2_URL}/${provider}`}
      className={cn(
        'relative flex h-14 w-full items-center justify-center gap-2 rounded-xl',
        {
          'bg-[#03C75A]': provider === 'naver',
          'bg-[#FEE500]': provider === 'kakao',
          'bg-[#F2F2F2]': provider === 'google',
        },
      )}
      {...props}
    >
      {isLastLogin && (
        <div className="absolute -top-2 right-2.5 rounded-lg rounded-bl-sm bg-gray-90 px-2.5 py-1.5 text-xs font-medium text-gray-00">
          {t('lastLogin')}
        </div>
      )}
      <div>
        <Image
          src={
            provider === 'naver'
              ? '/images/naver-auth-logo.svg'
              : provider === 'kakao'
                ? '/images/kakao-auth-logo.svg'
                : provider === 'google'
                  ? '/images/google-auth-logo.svg'
                  : ''
          }
          alt={`로그인 ${
            provider === 'naver'
              ? '네이버'
              : provider === 'kakao'
                ? '카카오'
                : provider === 'google'
                  ? '구글'
                  : ''
          } 로고`}
          width={18}
          height={18}
        />
      </div>
      <span
        className={cn('text-sm-300', {
          'text-gray-00': provider === 'naver',
          'text-gray-100': provider === 'kakao',
          'text-gray-80': provider === 'google',
        })}
      >
        {provider === 'naver'
          ? t('naver')
          : provider === 'kakao'
            ? t('kakao')
            : provider === 'google'
              ? t('google')
              : ''}{' '}
      </span>
    </Link>
  );
}
