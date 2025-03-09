import { create } from 'zustand';

import { MyScheduleTimeType } from '@/types/schedule.type';
import { weekdaysShortKo } from '@/utils/weekday';

interface MyScheduleStore {
  mySchedule: MyScheduleTimeType[];
  isMyScheduleEdited: boolean;
  actions: {
    setMySchedule: (mySchedule: MyScheduleTimeType[]) => void;
    setIsMyScheduleEdited: (isMyScheduleEdited: boolean) => void;
    resetMySchedule: () => void;
  };
}

const defaultMySchedule = weekdaysShortKo.map((weekday) => ({
  time_point: weekday,
  times: [],
}));

const useMyScheduleStore = create<MyScheduleStore>((set) => ({
  mySchedule: defaultMySchedule,
  isMyScheduleEdited: false,
  actions: {
    setMySchedule: (mySchedule) => {
      set({
        mySchedule,
      });
    },
    setIsMyScheduleEdited: (isMyScheduleEdited) => {
      set({
        isMyScheduleEdited,
      });
    },
    resetMySchedule: () => {
      set({
        mySchedule: defaultMySchedule,
        isMyScheduleEdited: false,
      });
    },
  },
}));

export const useMySchedule = () =>
  useMyScheduleStore((state) => state.mySchedule);
export const useIsMyScheduleEdited = () =>
  useMyScheduleStore((state) => state.isMyScheduleEdited);
export const useMyScheduleActions = () =>
  useMyScheduleStore((state) => state.actions);
