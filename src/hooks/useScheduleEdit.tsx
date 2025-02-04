import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { EventType } from '@/types/event.type';
import { MyScheduleTime, Schedule } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { getBlockTimeList } from '@/utils/time-block';
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
    enabled: event && !isNewGuest,
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
    if (!scheduleData || !fixedScheduleData) return;
    const isScheduleEmpty =
      scheduleData.schedules.length === 0 ||
      scheduleData.schedules.every((schedule) => schedule.times.length === 0);
    const isFixedScheduleEmpty = fixedScheduleData.every(
      (fixedSchedule) => fixedSchedule.times.length === 0,
    );
    if (isScheduleEmpty) {
      setSchedules([
        {
          name: scheduleData.name,
          schedules: isFixedScheduleEmpty ? [] : initSchedule() || [],
        },
      ]);
    } else {
      setSchedules([scheduleData]);
    }

    function initSchedule() {
      if (!event) return;
      return (
        event.ranges.map((time_point) => ({
          time_point,
          times: convertedTimeBlockList(
            event.start_time,
            event.end_time,
            fixedSchedule(time_point, event.category),
          ),
        })) || []
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

      function fixedSchedule(timePoint: string, category: 'DATE' | 'DAY') {
        return (
          fixedScheduleData?.find(
            (fixedSchedule) =>
              weekdayIndex(timePoint, category) ===
              weekdayIndex(fixedSchedule.time_point, 'DAY'),
          )?.times || []
        );
      }

      function convertedTimeBlockList(
        startTime: string,
        endTime: string,
        fixedScheduleTimes: string[],
      ) {
        return getBlockTimeList(startTime, endTime).filter(
          (time) => !fixedScheduleTimes.includes(time),
        );
      }
    }
  }, [scheduleData, fixedScheduleData]);

  return { schedules, setSchedules, event };
}
