'use client';

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
  const isLoggedIn =
    typeof localStorage !== 'undefined' &&
    localStorage.getItem('access-token') !== null;

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
  const [sleepTimesList, setSleepTimesList] = useState<string[]>([]);

  function timesGroupForSplittedTimeBlock(type: 'timeBlock' | 'timeLabel') {
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

  useEffect(() => {
    if (!sleepTimeData) return;
    setSleepTime(sleepTimeData);
  }, [sleepTimeData]);

  useEffect(() => {
    if (!_sleepTime) return;
    setSleepTime(_sleepTime);
  }, [_sleepTime]);

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
  }, [sleepTime]);

  return {
    sleepTimesList,
    timesGroupForSplittedTimeBlock,
    sleepTime,
    setSleepTime,
    sleepTimeData,
  };
}
