'use client';

import { getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export default function useDefaultLocale() {
  useEffect(() => {
    if (!getCookie('locale')) {
      setCookie('locale', window.navigator.language, {
        expires: dayjs().add(1, 'year').toDate(),
      });
    }
  }, []);
}
