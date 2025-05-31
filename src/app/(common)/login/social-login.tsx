'use client';

import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { auth, signIn } from '@/lib/auth';
import cn from '@/lib/cn';
import { SocialLoginType } from '@/lib/types';
import { Link, useRouter } from '@/navigation';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export function SocialLoginCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function socialLogin() {
      const accessTokenParams = searchParams.get('access_token');
      const refreshTokenParams = searchParams.get('refresh_token');
      const redirectUrlParams = searchParams.get('redirect_url');

      if (await auth()) {
        const redirectUrlCookie = await getCookie('redirect-url');
        if (redirectUrlCookie) await deleteCookie('redirect-url');
        router.replace(redirectUrlParams || redirectUrlCookie || '/');
      }

      if (accessTokenParams && refreshTokenParams) {
        await signIn(
          accessTokenParams,
          refreshTokenParams,
          redirectUrlParams || '/',
        );
      }
    }
    socialLogin();
  }, [router, searchParams]);

  return null;
}

export function SocialLoginButton({
  provider,
  className,
  lastLogin,
  ...rest
}: {
  provider: SocialLoginType;
  lastLogin: boolean;
} & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const t = useTranslations('login');

  function handleLoginButtonClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (searchParams.has('redirect_url'))
      setCookie('redirect-url', searchParams.get('redirect_url'));
    router.push(e.currentTarget.href);
    router.refresh();
  }

  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_SERVER_OAUTH2_URL}/naver`}
      className={cn(
        'relative flex h-14 w-full items-center justify-center gap-2 rounded-xl',
        {
          'bg-[#03C75A]': provider === 'naver',
          'bg-[#FEE500]': provider === 'kakao',
          'bg-[#F2F2F2]': provider === 'google',
        },
        className,
      )}
      onClick={handleLoginButtonClick}
      {...rest}
    >
      {lastLogin && (
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
