'use client';

import { useLocale } from 'next-intl';
import { createContext, useEffect, useState } from 'react';

import { weekdaysShortEn, weekdaysShortKo } from '@/constants';
import dayjs from '@/lib/dayjs';

export const WeekdayLocaleContext = createContext<{
  weekdaysShort: string[];
}>({
  weekdaysShort: [],
});

export default function WeekdayLocaleContextProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: string;
}) {
  const [weekdaysShort, setWeekdaysShort] = useState<string[]>(
    initialLocale === 'ko' ? weekdaysShortKo : weekdaysShortEn,
  );

  const locale = useLocale();

  dayjs.locale(locale);

  useEffect(() => {
    setWeekdaysShort(locale === 'ko' ? weekdaysShortKo : weekdaysShortEn);
  }, [locale]);

  return (
    <WeekdayLocaleContext.Provider value={{ weekdaysShort }}>
      {children}
    </WeekdayLocaleContext.Provider>
  );
}
