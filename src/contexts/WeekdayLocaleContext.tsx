'use client';

import { useLocale } from 'next-intl';
import { createContext, useEffect, useState } from 'react';

import { weekdaysShortEn, weekdaysShortKo } from '@/lib/constants';
import dayjs from '@/lib/dayjs';

export const WeekdayLocaleContext = createContext<{
  weekdaysShort: string[];
  changeWeekdaysLocale: (locale: string) => void;
}>({
  weekdaysShort: [],
  changeWeekdaysLocale: () => {},
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

  function changeWeekdaysLocale(locale: string) {
    setWeekdaysShort(locale === 'ko' ? weekdaysShortKo : weekdaysShortEn);
  }

  useEffect(() => {
    changeWeekdaysLocale(locale);
  }, [locale]);

  return (
    <WeekdayLocaleContext.Provider
      value={{ weekdaysShort, changeWeekdaysLocale }}
    >
      {children}
    </WeekdayLocaleContext.Provider>
  );
}
