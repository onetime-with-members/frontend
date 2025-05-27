'use client';

import { getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { UserType } from '@/lib/types';
import { useRouter } from '@/navigation';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export default function useLocalStorageSetUp() {
  const router = useRouter();

  const isLoggedIn = !!getCookie('access-token');

  const { data: user } = useQuery<UserType>({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await axios.get('/users/profile');
      return res.data.payload;
    },
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (
      getCookie('locale') &&
      ['ko', 'en'].includes(getCookie('locale') as string)
    ) {
      dayjs.locale(getCookie('locale') as string);
      return;
    }

    const locale = window.navigator.language.includes('ko') ? 'ko' : 'en';
    setCookie('locale', locale, {
      expires: dayjs().add(1, 'year').toDate(),
    });
    dayjs.locale(locale);
    router.refresh();
  }, [router]);

  useEffect(() => {
    if (!user) return;
    setCookie('last-login', user.social_platform, {
      expires: dayjs().add(1, 'year').toDate(),
    });
    const newLocale = user.language === 'KOR' ? 'ko' : 'en';
    setCookie('locale', newLocale, {
      expires: dayjs().add(1, 'year').toDate(),
    });
    dayjs.locale(newLocale);
  }, [user]);
}
