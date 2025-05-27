import { create } from 'zustand';

import { SleepTimeType } from '@/lib/types';
import { timeBlockList } from '@/lib/utils';

interface SleepTimeStore {
  sleepTime: SleepTimeType;
  sleepTimesList: string[];
  sleepTimeData: SleepTimeType;
  timesGroupForSplittedTimeBlock: string[][];
  timesGroupForSplittedTimeLabel: string[][];
  actions: {
    setSleepTime: (sleepTime: SleepTimeType) => void;
    resetSleepTime: () => void;
    setSleepTimeData: (sleepTimeData: SleepTimeType) => void;
    setSleepTimesList: (sleepTimesList: string[]) => void;
    setTimesGroupForSplittedTimeBlock: (
      timesGroupForSplittedTimeBlock: string[][],
    ) => void;
    setTimesGroupForSplittedTimeLabel: (
      timesGroupForSplittedTimeLabel: string[][],
    ) => void;
  };
}

export function getTimesGroupForSplitted(
  type: 'timeBlock' | 'timeLabel',
  sleepTime: SleepTimeType,
  sleepTimesList: string[],
) {
  return sleepTime.sleep_start_time >= sleepTime.sleep_end_time
    ? [
        timeBlockList('00:00', '24:00', type === 'timeBlock' ? '30m' : '1h')
          .filter((timeLabel) => !sleepTimesList.includes(timeLabel))
          .concat(
            type === 'timeLabel'
              ? [
                  sleepTime.sleep_start_time === sleepTime.sleep_end_time
                    ? '24:00'
                    : sleepTime.sleep_start_time,
                ]
              : [],
          ),
      ]
    : [
        timeBlockList(
          '00:00',
          sleepTime.sleep_start_time,
          type === 'timeBlock' ? '30m' : '1h',
        )
          .filter((timeLabel) => !sleepTimesList.includes(timeLabel))
          .concat(type === 'timeLabel' ? [sleepTime.sleep_start_time] : []),
        timeBlockList(
          sleepTime.sleep_end_time,
          '24:00',
          type === 'timeBlock' ? '30m' : '1h',
        )
          .filter((timeLabel) => !sleepTimesList.includes(timeLabel))
          .concat(type === 'timeLabel' ? ['24:00'] : []),
      ];
}

const DEFAULT_SLEEP_TIME: SleepTimeType = {
  sleep_start_time: '00:00',
  sleep_end_time: '00:00',
};

const useSleepTimeStore = create<SleepTimeStore>((set, get) => ({
  sleepTime: DEFAULT_SLEEP_TIME,
  sleepTimesList: [],
  sleepTimeData: DEFAULT_SLEEP_TIME,
  timesGroupForSplittedTimeBlock: [],
  timesGroupForSplittedTimeLabel: [],
  actions: {
    setSleepTime: (sleepTime) => {
      set({
        sleepTime,
      });
    },
    resetSleepTime: () => {
      set({
        sleepTime: get().sleepTimeData,
      });
    },
    setSleepTimeData: (sleepTimeData) => {
      set({
        sleepTimeData,
      });
    },
    setSleepTimesList: (sleepTimesList) => {
      set({
        sleepTimesList,
      });
    },
    setTimesGroupForSplittedTimeBlock: (timesGroupForSplittedTimeBlock) => {
      set({
        timesGroupForSplittedTimeBlock,
      });
    },
    setTimesGroupForSplittedTimeLabel: (timesGroupForSplittedTimeLabel) => {
      set({
        timesGroupForSplittedTimeLabel,
      });
    },
  },
}));

export const useSleepTime = () => useSleepTimeStore((state) => state.sleepTime);
export const useSleepTimesList = () =>
  useSleepTimeStore((state) => state.sleepTimesList);
export const useSleepTimeData = () =>
  useSleepTimeStore((state) => state.sleepTimeData);
export const useTimesGroupForSplittedTimeBlock = () =>
  useSleepTimeStore((state) => state.timesGroupForSplittedTimeBlock);
export const useTimesGroupForSplittedTimeLabel = () =>
  useSleepTimeStore((state) => state.timesGroupForSplittedTimeLabel);
export const useSleepTimeActions = () =>
  useSleepTimeStore((state) => state.actions);
