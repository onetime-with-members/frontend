import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import useSleepTime from './useSleepTime';
import { useEventQuery } from '@/queries/event.queries';
import { useScheduleDetailQuery } from '@/queries/schedule.queries';
import { MyScheduleTimeType, ScheduleType } from '@/types/schedule.type';
import { SleepTimeType } from '@/types/user.type';
import axios from '@/utils/axios';
import { timeBlockList } from '@/utils/time-block';
import { weekdaysShortKo } from '@/utils/weekday';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

interface UseScheduleCreateProps {
  isNewGuest: boolean;
  guestId: string;
}

function isScheduleEmpty(scheduleData: ScheduleType | undefined) {
  return scheduleData
    ? scheduleData.schedules.length === 0 ||
        scheduleData.schedules.every((schedule) => schedule.times.length === 0)
    : false;
}

function isFixedScheduleEmpty(
  fixedScheduleData: MyScheduleTimeType[] | undefined,
) {
  return fixedScheduleData
    ? fixedScheduleData.every((schedule) => schedule.times.length === 0)
    : true;
}

function isSleepTimeEmpty(sleepTimeData: SleepTimeType | undefined) {
  return sleepTimeData
    ? sleepTimeData.sleep_end_time === sleepTimeData.sleep_start_time
    : true;
}

export default function useScheduleAdd({
  isNewGuest,
  guestId,
}: UseScheduleCreateProps) {
  const { sleepTimesList, sleepTimeData } = useSleepTime();

  const params = useParams<{ id: string }>();

  const isLoggedIn =
    typeof localStorage !== 'undefined' &&
    localStorage.getItem('access-token') !== null;

  const { data: event } = useEventQuery(params.id);
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

  const [schedules, setSchedules] = useState<ScheduleType[]>([
    {
      name: '본인',
      schedules: [],
    },
  ]);
  const [isEmpty, setIsEmpty] = useState({
    schedule: isScheduleEmpty(scheduleData),
    fixedSchedule: isFixedScheduleEmpty(fixedScheduleData),
    sleepTime: isSleepTimeEmpty(sleepTimeData),
  });

  useEffect(() => {
    setIsEmpty({
      schedule: isScheduleEmpty(scheduleData),
      fixedSchedule: isFixedScheduleEmpty(fixedScheduleData),
      sleepTime: isSleepTimeEmpty(sleepTimeData),
    });
  }, [scheduleData, fixedScheduleData, sleepTimeData]);

  useEffect(() => {
    if (!event) return;

    const initSchedule = event.ranges.map((time_point) => ({
      time_point,
      times: [],
    }));

    if (!scheduleData) {
      setSchedules([
        {
          name: '본인',
          schedules: initSchedule,
        },
      ]);
      return;
    }
  }, [event, scheduleData]);

  useEffect(() => {
    if (!event || !scheduleData) return;

    const initSchedule = event.ranges.map((time_point) => ({
      time_point,
      times: [],
    }));

    setSchedules([
      {
        name: scheduleData.name,
        schedules: isEmpty.schedule
          ? isEmpty.fixedSchedule && isEmpty.sleepTime
            ? initSchedule
            : fixedAndSleepTimeSchedule()
          : initSchedule.map((schedule) => ({
              ...schedule,
              times:
                scheduleData.schedules.find(
                  (s) => s.time_point === schedule.time_point,
                )?.times || [],
            })),
      },
    ]);

    function fixedAndSleepTimeSchedule() {
      return (
        event?.ranges.map((time_point) => ({
          time_point,
          times: newTimes(
            event.start_time,
            event.end_time,
            fixedScheduleTimes(time_point, event.category),
            sleepTimesList,
          ),
        })) || initSchedule
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
          return category === 'DATE'
            ? dayjs(timePoint, 'YYYY.MM.DD').day()
            : weekdaysShortKo.indexOf(timePoint);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleData, event, fixedScheduleData, isEmpty]);

  return {
    schedules,
    setSchedules,
    event,
    isScheduleEmpty: isEmpty.schedule,
    isFixedScheduleEmpty: isEmpty.fixedSchedule,
    isSleepTimeEmpty: isEmpty.sleepTime,
  };
}
