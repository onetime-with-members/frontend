'use client';

import { createContext, useEffect, useState } from 'react';

import { useAuth } from '@/lib/auth';
import { defaultSleepTime } from '@/lib/constants';
import dayjs from '@/lib/dayjs';
import { sleepTimeQueryOption } from '@/lib/query-data';
import { SleepTimeType } from '@/lib/types';
import { getTimesGroupForSplitted, timeBlockList } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export const SleepTimeContext = createContext<{
  sleepTime: SleepTimeType;
  setSleepTime: React.Dispatch<React.SetStateAction<SleepTimeType>>;
  sleepTimesList: string[];
  timesGroupForSplittedTimeBlock: string[][];
  timesGroupForSplittedTimeLabel: string[][];
}>({
  sleepTime: defaultSleepTime,
  setSleepTime: () => {},
  sleepTimesList: [],
  timesGroupForSplittedTimeBlock: [],
  timesGroupForSplittedTimeLabel: [],
});

export default function SleepTimeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sleepTime, setSleepTime] = useState<SleepTimeType>(defaultSleepTime);
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

  const { isLoggedIn } = useAuth();

  const { data: sleepTimeData } = useQuery({
    ...sleepTimeQueryOption,
    enabled: isLoggedIn,
  });

  function resetSleepTime() {
    setSleepTime(sleepTimeData || defaultSleepTime);
  }

  useEffect(() => {
    if (!sleepTimeData) return;
    setSleepTime(sleepTimeData);
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
      }}
    >
      {children}
    </SleepTimeContext.Provider>
  );
}
