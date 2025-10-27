'use client';

import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useEffect } from 'react';

import {
  useUserPolicyQuery,
  useUserQuery,
} from '@/features/user/api/user.queries';
import { useAuth } from '@/lib/auth/auth.client';
import dayjs from '@/lib/dayjs';
import { useProgressRouter } from '@/navigation';
import { usePathname, useRouter } from 'next/navigation';

export default function SetUpProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const progressRouter = useProgressRouter();
  const pathname = usePathname();

  const { isLoggedIn } = useAuth();

  const { data: policy } = useUserPolicyQuery({ enabled: isLoggedIn });

  const { data: user } = useUserQuery({ enabled: isLoggedIn });

  useEffect(() => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('last-login');
    localStorage.removeItem('redirect-url');
    localStorage.removeItem('language');
    localStorage.removeItem('locale');
    localStorage.removeItem('i18nextLng');
  }, []);

  useEffect(() => {
    async function deleteOldCookies() {
      await deleteCookie('access-token');
      await deleteCookie('refresh-token');
    }
    deleteOldCookies();
  }, []);

  useEffect(() => {
    async function setUpLocale() {
      let newLocale: string;
      const cookieLocale = getCookie('locale');
      if (cookieLocale) {
        const parsedCookieLocale = ['ko', 'en'].includes(cookieLocale as string)
          ? (cookieLocale as string)
          : 'en';
        newLocale = parsedCookieLocale;
        if (isLoggedIn) {
          const userLocale = user?.language === 'KOR' ? 'ko' : 'en';
          if (parsedCookieLocale !== userLocale) {
            await setCookie('locale', userLocale, {
              expires: dayjs().add(1, 'year').toDate(),
            });
            newLocale = userLocale;
          }
        }
      } else {
        newLocale = isLoggedIn
          ? user?.language === 'KOR'
            ? 'ko'
            : 'en'
          : window.navigator.language.includes('ko')
            ? 'ko'
            : 'en';
        await setCookie('locale', newLocale, {
          expires: dayjs().add(1, 'year').toDate(),
        });
      }
      dayjs.locale(newLocale);
    }

    async function setUpLastLogin() {
      if (user && getCookie('last-login') !== user.social_platform) {
        await setCookie('last-login', user.social_platform, {
          expires: dayjs().add(1, 'year').toDate(),
        });
      }
    }

    setUpLocale();
    setUpLastLogin();

    router.refresh();
  }, [user]);

  useEffect(() => {
    if (pathname.startsWith('/policy') || pathname === '/withdraw') return;
    if (!policy) return;
    if (policy.servicePolicy && policy.privacyPolicy) return;
    progressRouter.push('/policy/edit');
  }, [pathname, policy]);

  useEffect(() => {
    async function deleteIsSignedOutCookie() {
      await deleteCookie('sign-out');
    }
    deleteIsSignedOutCookie();
  }, []);

  return children;
}
