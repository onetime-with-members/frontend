import { getCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import {
  getTimesGroupForSplitted,
  useSleepTime,
  useSleepTimeActions,
  useSleepTimesList,
} from '@/stores/sleep-time';
import { SleepTimeType } from '@/types/user.type';
import axios from '@/utils/axios';
import { timeBlockList } from '@/utils/time-block';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export default function useSleepTimeInit() {
  const sleepTime = useSleepTime();
  const sleepTimesList = useSleepTimesList();
  const {
    setSleepTime,
    resetSleepTime,
    setSleepTimeData,
    setSleepTimesList,
    setTimesGroupForSplittedTimeBlock,
    setTimesGroupForSplittedTimeLabel,
  } = useSleepTimeActions();

  const pathname = usePathname();

  const isLoggedIn = !!getCookie('access-token');

  const { data: sleepTimeDataOrigin } = useQuery<SleepTimeType>({
    queryKey: ['users', 'sleep-time'],
    queryFn: async () => {
      const res = await axios.get('/users/sleep-time');
      return res.data.payload;
    },
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (!sleepTimeDataOrigin) return;
    setSleepTime?.(sleepTimeDataOrigin);
    setSleepTimeData(sleepTimeDataOrigin);
  }, [sleepTimeDataOrigin, setSleepTime, setSleepTimeData]);

  useEffect(() => {
    setSleepTimesList(
      isSame(sleepTime.sleep_start_time, sleepTime.sleep_end_time)
        ? []
        : isBefore(sleepTime.sleep_start_time, sleepTime.sleep_end_time)
          ? timeBlockList(sleepTime.sleep_start_time, sleepTime.sleep_end_time)
          : [
              ...timeBlockList(sleepTime.sleep_start_time, '24:00'),
              ...timeBlockList('00:00', sleepTime.sleep_end_time),
            ],
    );

    function isSame(time1: string, time2: string) {
      return dayjs(time1, 'HH:mm').isSame(dayjs(time2, 'HH:mm'));
    }

    function isBefore(time1: string, time2: string) {
      return dayjs(time1, 'HH:mm').isBefore(dayjs(time2, 'HH:mm'));
    }
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
  }, [resetSleepTime, pathname]);
}
