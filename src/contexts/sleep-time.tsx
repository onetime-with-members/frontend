'use client';

import { createContext, useEffect, useState } from 'react';

import { useSleepTimeQuery } from '@/features/my-schedule/api/my-schedule.queries';
import { SleepTime } from '@/features/my-schedule/models';
import { useAuth } from '@/lib/auth/auth.client';
import dayjs from '@/lib/dayjs';
import { getTimesGroupForSplitted, timeBlockList } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export const SleepTimeContext = createContext<{
  sleepTime: SleepTime;
  setSleepTime: React.Dispatch<React.SetStateAction<SleepTime>>;
  sleepTimesList: string[];
  timesGroupForSplittedTimeBlock: string[][];
  timesGroupForSplittedTimeLabel: string[][];
}>({
  sleepTime: new SleepTime(),
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
  const [sleepTime, setSleepTime] = useState<SleepTime>(new SleepTime());
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

  const { data: sleepTimeData } = useSleepTimeQuery({ enabled: isLoggedIn });

  function resetSleepTime() {
    setSleepTime(sleepTimeData);
  }

  useEffect(() => {
    if (!sleepTimeData) return;
    setSleepTime(sleepTimeData);
  }, [sleepTimeData]);

  useEffect(() => {
    setSleepTimesList(
      dayjs(sleepTime.startTime, 'HH:mm').isSame(
        dayjs(sleepTime.endTime, 'HH:mm'),
      )
        ? []
        : dayjs(sleepTime.startTime, 'HH:mm').isBefore(
              dayjs(sleepTime.endTime, 'HH:mm'),
            )
          ? timeBlockList(sleepTime.startTime, sleepTime.endTime)
          : [
              ...timeBlockList(sleepTime.startTime, '24:00'),
              ...timeBlockList('00:00', sleepTime.endTime),
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
      '/mypage/schedule/edit',
      '/mypage/schedule/everytime/edit',
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
