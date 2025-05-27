import { create } from 'zustand';

import { weekdaysShortEn, weekdaysShortKo } from '@/lib/constants';

interface WeekdayStore {
  weekdaysShort: string[];
  actions: {
    changeWeekdaysLocale: (locale: 'ko' | 'en') => void;
  };
}

const useWeekdayStore = create<WeekdayStore>((set) => ({
  weekdaysShort: [],
  actions: {
    changeWeekdaysLocale: (locale) => {
      set(() => ({
        weekdaysShort: locale === 'ko' ? weekdaysShortKo : weekdaysShortEn,
      }));
    },
  },
}));

export const useWeekdaysShort = () =>
  useWeekdayStore((state) => state.weekdaysShort);
export const useWeekdayActions = () =>
  useWeekdayStore((state) => state.actions);
