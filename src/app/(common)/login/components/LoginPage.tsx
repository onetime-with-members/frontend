'use client';

import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { useContext, useEffect } from 'react';

import ButtonGroup from './ButtonGroup/ButtonGroup';
import LogoContent from './LogoContent/LogoContent';
import NavBar from '@/components/nav-bar';
import { CurrentUserContext } from '@/contexts/CurrentUserContext';
import { signIn } from '@/lib/auth';
import { useRouter } from '@/navigation';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { user } = useContext(CurrentUserContext);

  useEffect(() => {
    if (user) {
      const redirectUrlCookie = getCookie('redirect-url');
      deleteCookie('redirect-url');
      router.push((redirectUrlCookie as string) || '/');
    }
  }, [router, user]);

  useEffect(() => {
    async function authenticate() {
      const registerToken = searchParams.get('register_token');
      const name = searchParams.get('name');
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const redirectUrl = searchParams.get('redirect_url');

      if (redirectUrl) {
        setCookie('redirect-url', redirectUrl, {
          expires: dayjs().add(1, 'year').toDate(),
        });
      }

      if (registerToken || name) {
        const urlSearchParams = new URLSearchParams([
          ...(registerToken ? [['register_token', registerToken]] : []),
          ...(name ? [['name', name]] : []),
        ]);
        router.push(`/onboarding?${urlSearchParams.toString()}`);
      } else if (accessToken && refreshToken) {
        await signIn(accessToken, refreshToken, redirectUrl || '/');
      }
    }
    authenticate();
  }, [searchParams, router]);

  return (
    <div className="flex h-screen flex-col">
      <NavBar />
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="mx-auto flex w-full max-w-[22rem] -translate-y-12 flex-col gap-12">
          <LogoContent />
          <ButtonGroup />
        </div>
      </div>
    </div>
  );
}
