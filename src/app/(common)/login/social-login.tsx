'use client';

import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { SocialLoginType } from './page';
import { auth, signIn } from '@/lib/auth';
import cn from '@/lib/cn';
import { useProgressRouter } from '@/navigation';
import Image from 'next/image';
import Link from 'next/link';

export function SocialLoginCallback({
  searchParams,
  cookies,
}: {
  searchParams: {
    accessToken?: string;
    refreshToken?: string;
    redirectUrl?: string;
  };
  cookies: {
    redirectUrl?: string;
  };
}) {
  const progressRouter = useProgressRouter();

  useEffect(() => {
    async function socialLogin() {
      if (searchParams.redirectUrl) {
        await setCookie('redirect-url', searchParams.redirectUrl);
      }

      if (searchParams.accessToken && searchParams.refreshToken) {
        await signIn(searchParams.accessToken, searchParams.refreshToken);
        const redirectUrl = (await getCookie('redirect-url')) || '/';
        await deleteCookie('redirect-url');
        progressRouter.push(redirectUrl);
      } else if (await auth()) {
        progressRouter.replace(
          searchParams.redirectUrl || cookies.redirectUrl || '/',
        );
        await deleteCookie('redirect-url');
      }
    }
    socialLogin();
  }, [searchParams, cookies]);

  return null;
}

export function SocialLoginButton({
  provider,
  className,
  lastLogin,
  ...props
}: {
  provider: SocialLoginType;
  lastLogin: boolean;
} & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) {
  const t = useTranslations('login');

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
        className,
      )}
      {...props}
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
