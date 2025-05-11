'use client';

import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import ButtonGroup from './ButtonGroup/ButtonGroup';
import LogoContent from './LogoContent/LogoContent';
import NavBar from '@/components/NavBar/NavBar';
import { useRouter } from '@/navigation';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const hasTokens = !!getCookie('access-token') && !!getCookie('refresh-token');

  const { data, isError } = useQuery({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await axios.get('/users/profile');
      return res.data.payload;
    },
    enabled: hasTokens,
  });

  useEffect(() => {
    if (data) {
      const redirectUrlCookie = getCookie('redirect-url');
      deleteCookie('redirect-url');
      router.push((redirectUrlCookie as string) || '/');
    }
  }, [data, isError, router]);

  useEffect(() => {
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
      setCookie('access-token', accessToken, {
        expires: dayjs().add(1, 'year').toDate(),
      });
      setCookie('refresh-token', refreshToken, {
        expires: dayjs().add(1, 'year').toDate(),
      });
    }
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
