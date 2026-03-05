import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { Locale } from 'next-intl';
import { useEffect } from 'react';

import { useUserQuery } from '@/features/user/api/user.query';
import useChangeLocale from '@/features/user/hooks/useChangeLocale';
import { useRouter } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth';
import dayjs from '@/lib/dayjs';

export default function useSetUpCookieWithUserData() {
  const router = useRouter();

  const changeLocale = useChangeLocale();
  const { isLoggedIn } = useAuth();

  const { data: user } = useUserQuery();

  useEffect(() => {
    (async () => {
      if (!user) return;
      const lastLoginCookie = await getCookie('last-login');
      if (lastLoginCookie !== user.social_platform) {
        await setCookie('last-login', user.social_platform, {
          expires: dayjs().add(1, 'year').toDate(),
        });
        router.refresh();
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const userLocaleCookie = await getCookie('USER_LOCALE');
      const userLocale: Locale = user.language === 'KOR' ? 'ko' : 'en';
      if (userLocaleCookie !== userLocale) {
        await setCookie('USER_LOCALE', userLocale, {
          expires: dayjs().add(1, 'year').toDate(),
        });
      }
      const nextLocaleCookie = await getCookie('NEXT_LOCALE');
      if (nextLocaleCookie !== userLocale) {
        changeLocale(userLocale);
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      const userLocaleCookie = (await getCookie('USER_LOCALE')) as Locale;
      const nextLocaleCookie = await getCookie('NEXT_LOCALE');
      if (
        userLocaleCookie &&
        nextLocaleCookie &&
        userLocaleCookie !== nextLocaleCookie
      ) {
        changeLocale(userLocaleCookie);
      }
      if (!isLoggedIn) {
        await deleteCookie('USER_LOCALE');
      }
    })();
  }, [isLoggedIn]);
}
