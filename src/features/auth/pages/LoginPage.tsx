'use client';

import { getCookie, setCookie } from 'cookies-next';
import { useEffect } from 'react';

import LogoContent from '../components/login/LogoContent';
import SocialLoginButton from '../components/login/SocialLoginButton';
import NavBar from '@/components/NavBar';
import { REDIRECT_URL } from '@/features/auth/constants';
import useHomeUrl from '@/features/home/hooks/useHomeUrl';
import { useAuth } from '@/lib/auth';
import { useProgressRouter } from '@/navigation';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();

  const progressRouter = useProgressRouter();
  const homeUrl = useHomeUrl();
  const { isLoggedIn, signIn } = useAuth();

  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');
  const redirectUrl = searchParams.get('redirect_url');

  const isLoggingIn = !!accessToken && !!refreshToken;

  useEffect(() => {
    (async () => {
      if (redirectUrl) {
        await setCookie(REDIRECT_URL, redirectUrl);
      }
    })();
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      if (isLoggingIn && !isLoggedIn) {
        await signIn({
          accessToken: accessToken as string,
          refreshToken: refreshToken as string,
        });
      }
    })();
  }, [isLoggingIn, isLoggedIn, accessToken, refreshToken, signIn]);

  useEffect(() => {
    if (isLoggedIn) {
      const savedRedirectUrl = getCookie(REDIRECT_URL);
      const targetUrl = redirectUrl || savedRedirectUrl || homeUrl;
      progressRouter.replace(targetUrl as string);
    }
  }, [isLoggedIn, redirectUrl, homeUrl, progressRouter]);

  return (
    <div className="flex h-screen flex-col" data-testid="login-page">
      <NavBar />
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="mx-auto flex w-full max-w-[22rem] -translate-y-12 flex-col gap-12">
          <LogoContent />
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
