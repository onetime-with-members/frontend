import { useLocale } from 'next-intl';
import { useEffect } from 'react';

import { useWeekdayActions } from '@/stores/weekday';

export default function useWeekdayInit() {
  const { changeWeekdaysLocale } = useWeekdayActions();

  const locale = useLocale();

  useEffect(() => {
    changeWeekdaysLocale(locale as 'en' | 'ko');
  }, [locale, changeWeekdaysLocale]);
}
