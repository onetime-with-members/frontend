'use client';

import { getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { useRouter } from '@/navigation';

export default function useDefaultLocale() {
  const router = useRouter();

  useEffect(() => {
    if (
      getCookie('locale') &&
      ['ko', 'en'].includes(getCookie('locale') as string)
    )
      return;

    const locale = window.navigator.language.includes('ko') ? 'ko' : 'en';
    setCookie('locale', locale, {
      expires: dayjs().add(1, 'year').toDate(),
    });
    dayjs.locale(locale);
    router.refresh();
  }, [router]);
}
