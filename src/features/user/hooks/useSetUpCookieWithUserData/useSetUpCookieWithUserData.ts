import { getCookie, setCookie } from 'cookies-next';
import { Locale } from 'next-intl';
import { useEffect } from 'react';

import { useUserQuery } from '@/features/user/api/user.query';
import useChangeLocale from '@/features/user/hooks/useChangeLocale';
import { useRouter } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth';
import dayjs from '@/lib/dayjs';

export default function useSetUpCookieWithUserData() {
  const router = useRouter();

  const { isLoggedIn } = useAuth();
  const changeLocale = useChangeLocale();

  const { data: user } = useUserQuery({ enabled: isLoggedIn });

  useEffect(() => {
    async function setUpLastLoginCookie() {
      if (!user) return;

      const lastLoginCookie = await getCookie('last-login');

      if (lastLoginCookie !== user.social_platform) {
        await setCookie('last-login', user.social_platform, {
          expires: dayjs().add(1, 'year').toDate(),
        });
        router.refresh();
      }
    }
    setUpLastLoginCookie();
  }, [user]);

  useEffect(() => {
    async function setUpLocaleCookie() {
      if (!user) return;

      const localeCookie = await getCookie('NEXT_LOCALE');
      const userLocale: Locale = user.language === 'KOR' ? 'ko' : 'en';

      if (localeCookie !== userLocale) {
        await setCookie('NEXT_LOCALE', userLocale);
        changeLocale(userLocale);
      }
    }
    setUpLocaleCookie();
  }, [user]);
}
