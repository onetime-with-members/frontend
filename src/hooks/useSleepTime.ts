import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { DEFAULT_SLEEP_TIME } from '@/constants/sleep-time';
import { SleepTimeType } from '@/types/user.type';
import axios from '@/utils/axios';
import { timeBlockList } from '@/utils/time-block';
import { useQuery } from '@tanstack/react-query';

interface UseSleepTimeProps {
  sleepTime?: SleepTimeType;
}

export default function useSleepTime({
  sleepTime: _sleepTime,
}: UseSleepTimeProps = {}) {
  const isLoggedIn = localStorage.getItem('access-token') !== null;

  const { data: sleepTimeData } = useQuery<SleepTimeType>({
    queryKey: ['users', 'sleep-time'],
    queryFn: async () => {
      const res = await axios.get('/users/sleep-time');
      return res.data.payload;
    },
    enabled: isLoggedIn,
  });

  const [sleepTime, setSleepTime] = useState<SleepTimeType>(
    _sleepTime || sleepTimeData || DEFAULT_SLEEP_TIME,
  );

  const { sleep_start_time: startSleepTime, sleep_end_time: endSleepTime } =
    sleepTime || DEFAULT_SLEEP_TIME;

  useEffect(() => {
    if (!sleepTimeData) return;
    setSleepTime && setSleepTime(sleepTimeData);
  }, [sleepTimeData]);

  useEffect(() => {
    if (!_sleepTime) return;
    setSleepTime(_sleepTime);
  }, [_sleepTime]);

  const sleepTimesList = isSame(startSleepTime, endSleepTime)
    ? []
    : isBefore(startSleepTime, endSleepTime)
      ? timeBlockList(startSleepTime, endSleepTime)
      : [
          ...timeBlockList(startSleepTime, '24:00'),
          ...timeBlockList('00:00', endSleepTime),
        ];

  function isSame(time1: string, time2: string) {
    return dayjs(time1, 'HH:mm').isSame(dayjs(time2, 'HH:mm'));
  }

  function isBefore(time1: string, time2: string) {
    return dayjs(time1, 'HH:mm').isBefore(dayjs(time2, 'HH:mm'));
  }

  function timesGroupForSplittedTimeBlock(type: 'timeBlock' | 'timeLabel') {
    return startSleepTime >= endSleepTime
      ? [
          timeBlockList('00:00', '24:00', type === 'timeBlock' ? '30m' : '1h')
            .filter((timeLabel) => !sleepTimesList.includes(timeLabel))
            .concat(
              type === 'timeLabel'
                ? [startSleepTime === endSleepTime ? '24:00' : startSleepTime]
                : [],
            ),
        ]
      : [
          timeBlockList(
            '00:00',
            startSleepTime,
            type === 'timeBlock' ? '30m' : '1h',
          )
            .filter((timeLabel) => !sleepTimesList.includes(timeLabel))
            .concat(type === 'timeLabel' ? [startSleepTime] : []),
          timeBlockList(
            endSleepTime,
            '24:00',
            type === 'timeBlock' ? '30m' : '1h',
          )
            .filter((timeLabel) => !sleepTimesList.includes(timeLabel))
            .concat(type === 'timeLabel' ? ['24:00'] : []),
        ];
  }

  return {
    sleepTimesList,
    timesGroupForSplittedTimeBlock,
    sleepTime,
    setSleepTime,
    sleepTimeData,
  };
}
