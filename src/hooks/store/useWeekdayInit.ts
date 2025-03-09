import { useLocale } from 'next-intl';
import { useEffect } from 'react';

import { useWeekdayActions, useWeekdaysShort } from '@/stores/weekday';

export default function useWeekdayInit() {
  const weekdaysShort = useWeekdaysShort();
  const { changeWeekdaysLocale } = useWeekdayActions();

  const locale = useLocale();

  useEffect(() => {
    changeWeekdaysLocale(locale as 'en' | 'ko');
  }, [locale, changeWeekdaysLocale]);

  useEffect(() => {
    console.log('weekdaysShort:', weekdaysShort);
  }, [weekdaysShort]);
}
