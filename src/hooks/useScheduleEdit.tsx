import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { EventType } from '@/types/event.type';
import { MyScheduleTime, Schedule } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { timeBlockList } from '@/utils/time-block';
import { useQuery } from '@tanstack/react-query';

interface UseScheduleEditProps {
  isNewGuest: boolean;
  guestId: string;
}

export default function useScheduleEdit({
  isNewGuest,
  guestId,
}: UseScheduleEditProps) {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      name: '본인',
      schedules: [],
    },
  ]);

  const params = useParams<{ eventId: string }>();

  const isLoggedIn = localStorage.getItem('access-token') !== null;

  const { data: event } = useQuery<EventType>({
    queryKey: ['events', params.eventId],
    queryFn: async () => {
      const res = await axios.get(`/events/${params.eventId}`);
      return res.data.payload;
    },
  });

  const { data: scheduleData } = useQuery<Schedule>({
    queryKey: [
      'schedules',
      event?.category?.toLowerCase(),
      params.eventId,
      isLoggedIn ? 'user' : guestId,
    ],
    queryFn: async () => {
      const res = await axios.get(
        `/schedules/${event?.category?.toLowerCase()}/${params.eventId}/${isLoggedIn ? 'user' : guestId}`,
      );
      return res.data.payload;
    },
    enabled:
      event !== undefined || !isNewGuest || !isLoggedIn || guestId !== '',
  });

  const { data: fixedScheduleData } = useQuery<MyScheduleTime[]>({
    queryKey: ['fixed-schedules'],
    queryFn: async () => {
      const res = await axios.get('/fixed-schedules');
      return res.data.payload.schedules;
    },
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (!scheduleData) return;
    const isScheduleEmpty =
      scheduleData.schedules.length === 0 ||
      scheduleData.schedules.every((schedule) => schedule.times.length === 0);
    const isFixedScheduleEmpty = fixedScheduleData
      ? fixedScheduleData.every(
          (fixedSchedule) => fixedSchedule.times.length === 0,
        )
      : true;
    setSchedules([
      {
        name: scheduleData.name,
        schedules: isScheduleEmpty
          ? isFixedScheduleEmpty
            ? []
            : initSchedule() || []
          : scheduleData.schedules,
      },
    ]);

    function initSchedule() {
      if (!event) return;
      return (
        event.ranges.map((time_point) => ({
          time_point,
          times: newTimes(
            event.start_time,
            event.end_time,
            fixedScheduleTimes(time_point, event.category),
            sleepTimes('23:00', '23:00'),
          ),
        })) || []
      );

      function newTimes(
        startTime: string,
        endTime: string,
        fixedScheduleTimes: string[],
        sleepTimes: string[],
      ) {
        return timeBlockList(startTime, endTime).filter(
          (time) =>
            !unavailableTimes(fixedScheduleTimes, sleepTimes).includes(time),
        );

        function unavailableTimes(
          fixedScheduleTimes: string[],
          sleepTimes: string[],
        ) {
          return Array.from(
            new Set([...fixedScheduleTimes, ...sleepTimes]),
          ).sort();
        }
      }

      function fixedScheduleTimes(timePoint: string, category: 'DATE' | 'DAY') {
        return (
          fixedScheduleData?.find(
            (fixedSchedule) =>
              weekdayIndex(timePoint, category) ===
              weekdayIndex(fixedSchedule.time_point, 'DAY'),
          )?.times || []
        );

        function weekdayIndex(
          timePoint: string,
          category: 'DATE' | 'DAY' = 'DAY',
        ) {
          return dayjs
            .weekdaysMin()
            .findIndex(
              (w) =>
                w ===
                (category === 'DATE'
                  ? dayjs(timePoint).format('ddd')
                  : timePoint),
            );
        }
      }

      function sleepTimes(startTime: string, endTime: string) {
        return isSame(startTime, endTime)
          ? []
          : isBefore(startTime, endTime)
            ? timeBlockList(startTime, endTime)
            : [
                ...timeBlockList(startTime, '24:00'),
                ...timeBlockList('00:00', endTime),
              ];

        function isSame(time1: string, time2: string) {
          return dayjs(time1, 'HH:mm').isSame(dayjs(time2, 'HH:mm'));
        }

        function isBefore(time1: string, time2: string) {
          return dayjs(time1, 'HH:mm').isBefore(dayjs(time2, 'HH:mm'));
        }
      }
    }
  }, [scheduleData, fixedScheduleData, isNewGuest, guestId]);

  return { schedules, setSchedules, event };
}
