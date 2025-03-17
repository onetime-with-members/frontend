'use client';

import { getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { useRouter } from '@/navigation';

export default function useDefaultLocale() {
  const router = useRouter();

  useEffect(() => {
    if (!getCookie('locale')) {
      setCookie('locale', window.navigator.language, {
        expires: dayjs().add(1, 'year').toDate(),
      });
      router.refresh();
    }
  }, [router]);
}
