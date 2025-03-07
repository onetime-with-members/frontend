import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useEventQuery } from '@/queries/event.queries';
import { useScheduleDetailQuery } from '@/queries/schedule.queries';
import { useSleepTimeData, useSleepTimesList } from '@/stores/sleep-time';
import { MyScheduleTimeType, ScheduleType } from '@/types/schedule.type';
import { SleepTimeType } from '@/types/user.type';
import axios from '@/utils/axios';
import { timeBlockList } from '@/utils/time-block';
import { weekdaysShortKo } from '@/utils/weekday';
import { useQuery } from '@tanstack/react-query';

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
  const [initialSchedule, setInitialSchedule] = useState<ScheduleType[]>([]);

  const sleepTimeData = useSleepTimeData();
  const sleepTimesList = useSleepTimesList();

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
    const defaultSchedule =
      event?.ranges.map((time_point) => ({
        time_point,
        times: [],
      })) || [];

    const initialSchedule = [
      {
        name: scheduleData?.name || '본인',
        schedules: isEmpty.schedule
          ? isEmpty.fixedSchedule && isEmpty.sleepTime
            ? defaultSchedule
            : fixedAndSleepTimeSchedule()
          : defaultSchedule.map((schedule) => ({
              ...schedule,
              times:
                scheduleData?.schedules.find(
                  (s) => s.time_point === schedule.time_point,
                )?.times || [],
            })),
      },
    ];

    setInitialSchedule(initialSchedule);
    setSchedules(initialSchedule);

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
        })) || defaultSchedule
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
  }, [
    event,
    scheduleData,
    fixedScheduleData,
    sleepTimeData,
    isEmpty,
    sleepTimesList,
  ]);

  return {
    schedules,
    setSchedules,
    event,
    isScheduleEmpty: isEmpty.schedule,
    isFixedScheduleEmpty: isEmpty.fixedSchedule,
    isSleepTimeEmpty: isEmpty.sleepTime,
    initialSchedule,
  };
}
