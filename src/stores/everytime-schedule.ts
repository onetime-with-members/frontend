import { create } from 'zustand';

import { EverytimeSchedule } from '@/lib/types';

interface EverytimeScheduleStore {
  everytimeSchedule: EverytimeSchedule;
  actions: {
    setEverytimeSchedule: (everytimeSchedule: EverytimeSchedule) => void;
  };
}

const useEverytimeScheduleStore = create<EverytimeScheduleStore>((set) => ({
  everytimeSchedule: [],
  actions: {
    setEverytimeSchedule: (everytimeSchedule) => {
      set({
        everytimeSchedule,
      });
    },
  },
}));

export const useEverytimeSchedule = () =>
  useEverytimeScheduleStore((state) => state.everytimeSchedule);
export const useEverytimeScheduleActions = () =>
  useEverytimeScheduleStore((state) => state.actions);
