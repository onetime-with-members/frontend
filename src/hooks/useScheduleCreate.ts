import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useSleepTime from './useSleepTime';
import { useEventQuery } from '@/queries/event.queries';
import { useScheduleDetailQuery } from '@/queries/schedule.queries';
import { MyScheduleTimeType, ScheduleType } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { timeBlockList } from '@/utils/time-block';
import { useQuery } from '@tanstack/react-query';

interface UseScheduleCreateProps {
  isNewGuest: boolean;
  guestId: string;
}

export default function useScheduleCreate({
  isNewGuest,
  guestId,
}: UseScheduleCreateProps) {
  const [schedules, setSchedules] = useState<ScheduleType[]>([
    {
      name: '본인',
      schedules: [],
    },
  ]);

  const { sleepTimesList, sleepTimeData } = useSleepTime();

  const params = useParams<{ eventId: string }>();

  const isLoggedIn = localStorage.getItem('access-token') !== null;

  const { data: event } = useEventQuery(params.eventId);
  const { data: scheduleData } = useScheduleDetailQuery({
    event,
    guestId,
    isNewGuest,
    isLoggedIn,
  });
  const { data: fixedScheduleData } = useQuery<MyScheduleTimeType[]>({
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
    const isSleepTimeEmpty = sleepTimeData
      ? sleepTimeData.sleep_end_time === sleepTimeData.sleep_start_time
      : true;
    setSchedules([
      {
        name: scheduleData.name,
        schedules: isScheduleEmpty
          ? isFixedScheduleEmpty && isSleepTimeEmpty
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
            sleepTimesList,
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
            .weekdaysShort()
            .findIndex(
              (w) =>
                w ===
                (category === 'DATE'
                  ? dayjs(timePoint, 'YYYY.MM.DD').format('ddd')
                  : timePoint),
            );
        }
      }
    }
  }, [event, scheduleData, fixedScheduleData, sleepTimeData]);

  return { schedules, setSchedules, event };
}
