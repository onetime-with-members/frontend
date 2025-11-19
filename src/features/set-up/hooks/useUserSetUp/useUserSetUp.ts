import { getCookie, setCookie } from 'cookies-next';
import { useEffect } from 'react';

import { useUserQuery } from '@/features/user/api/user.query';
import { useRouter } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth';
import dayjs from '@/lib/dayjs';

export default function useUserSetUp() {
  const router = useRouter();

  const { isLoggedIn } = useAuth();

  const { data: user } = useUserQuery({ enabled: isLoggedIn });

  useEffect(() => {
    async function setUpLocale() {
      let newLocale: string;
      const cookieLocale = await getCookie('locale');
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
  }, [user, isLoggedIn]);
}
