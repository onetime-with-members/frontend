'use client';

import dayjs from 'dayjs';
import { createContext, useCallback, useEffect, useState } from 'react';

import { auth } from '@/lib/auth';
import { defaultSleepTime } from '@/lib/constants';
import { fetchSleepTime } from '@/lib/data';
import { SleepTimeType } from '@/lib/types';
import { getTimesGroupForSplitted, timeBlockList } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export const SleepTimeContext = createContext<{
  sleepTime: SleepTimeType;
  setSleepTime: React.Dispatch<React.SetStateAction<SleepTimeType>>;
  sleepTimesList: string[];
  timesGroupForSplittedTimeBlock: string[][];
  timesGroupForSplittedTimeLabel: string[][];
  revalidateSleepTime: () => void;
}>({
  sleepTime: defaultSleepTime,
  setSleepTime: () => {},
  sleepTimesList: [],
  timesGroupForSplittedTimeBlock: [],
  timesGroupForSplittedTimeLabel: [],
  revalidateSleepTime: () => {},
});

export default function SleepTimeContextProvider({
  children,
  defaultSleepTime: fetchedSleepTime,
}: {
  children: React.ReactNode;
  defaultSleepTime: SleepTimeType | undefined;
}) {
  const [sleepTime, setSleepTime] = useState<SleepTimeType>(
    fetchedSleepTime || defaultSleepTime,
  );
  const [sleepTimeData, setSleepTimeData] = useState<SleepTimeType>(
    fetchedSleepTime || defaultSleepTime,
  );
  const [sleepTimesList, setSleepTimesList] = useState<string[]>([]);
  const [timesGroupForSplittedTimeBlock, setTimesGroupForSplittedTimeBlock] =
    useState<string[][]>(
      getTimesGroupForSplitted('timeBlock', sleepTime, sleepTimesList),
    );
  const [timesGroupForSplittedTimeLabel, setTimesGroupForSplittedTimeLabel] =
    useState<string[][]>(
      getTimesGroupForSplitted('timeLabel', sleepTime, sleepTimesList),
    );

  const pathname = usePathname();

  const resetSleepTime = useCallback(() => {
    setSleepTime(sleepTimeData);
  }, [sleepTimeData]);

  async function revalidateSleepTime() {
    if (!(await auth())) return;
    const data = await fetchSleepTime();
    if (!data) return;
    setSleepTime(data);
    setSleepTimeData(data);
  }

  useEffect(() => {
    revalidateSleepTime();
  }, []);

  useEffect(() => {
    setSleepTimesList(
      dayjs(sleepTime.sleep_start_time, 'HH:mm').isSame(
        dayjs(sleepTime.sleep_end_time, 'HH:mm'),
      )
        ? []
        : dayjs(sleepTime.sleep_start_time, 'HH:mm').isBefore(
              dayjs(sleepTime.sleep_end_time, 'HH:mm'),
            )
          ? timeBlockList(sleepTime.sleep_start_time, sleepTime.sleep_end_time)
          : [
              ...timeBlockList(sleepTime.sleep_start_time, '24:00'),
              ...timeBlockList('00:00', sleepTime.sleep_end_time),
            ],
    );
  }, [sleepTime, setSleepTimesList]);

  useEffect(() => {
    setTimesGroupForSplittedTimeBlock(
      getTimesGroupForSplitted('timeBlock', sleepTime, sleepTimesList),
    );
    setTimesGroupForSplittedTimeLabel(
      getTimesGroupForSplitted('timeLabel', sleepTime, sleepTimesList),
    );
  }, [
    sleepTime,
    sleepTimesList,
    setTimesGroupForSplittedTimeBlock,
    setTimesGroupForSplittedTimeLabel,
  ]);

  useEffect(() => {
    const locationsNotToReset = [
      '/mypage/schedules/edit',
      '/mypage/schedules/everytime/edit',
    ];
    if (locationsNotToReset.includes(pathname)) return;
    resetSleepTime();
  }, [pathname, resetSleepTime]);

  return (
    <SleepTimeContext.Provider
      value={{
        sleepTime,
        setSleepTime,
        sleepTimesList,
        timesGroupForSplittedTimeBlock,
        timesGroupForSplittedTimeLabel,
        revalidateSleepTime,
      }}
    >
      {children}
    </SleepTimeContext.Provider>
  );
}
