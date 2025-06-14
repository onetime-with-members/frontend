import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';

import { SleepTimeContext } from '@/contexts/sleep-time';
import { weekdaysShortKo } from '@/lib/constants';
import {
  EventType,
  MyScheduleTimeType,
  ScheduleType,
  SleepTimeType,
} from '@/lib/types';
import { timeBlockList } from '@/lib/utils';

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
  event,
  schedule,
  mySchedule,
  sleepTime,
}: {
  event: EventType;
  schedule: ScheduleType;
  mySchedule: MyScheduleTimeType[];
  sleepTime: SleepTimeType;
}) {
  const [initialSchedule, setInitialSchedule] = useState<ScheduleType[]>([]);

  const { sleepTimesList } = useContext(SleepTimeContext);

  const [schedules, setSchedules] = useState<ScheduleType[]>([
    {
      name: '본인',
      schedules: [],
    },
  ]);
  const [isEmpty, setIsEmpty] = useState({
    schedule: isScheduleEmpty(schedule),
    fixedSchedule: isFixedScheduleEmpty(mySchedule),
    sleepTime: isSleepTimeEmpty(sleepTime),
  });

  useEffect(() => {
    setIsEmpty({
      schedule: isScheduleEmpty(schedule),
      fixedSchedule: isFixedScheduleEmpty(mySchedule),
      sleepTime: isSleepTimeEmpty(sleepTime),
    });
  }, [schedule, mySchedule, sleepTime]);

  useEffect(() => {
    const defaultSchedule = event.ranges.map((time_point) => ({
      time_point,
      times: [],
    }));

    const initialSchedule = [
      {
        name: schedule.name || '본인',
        schedules: isEmpty.schedule
          ? isEmpty.fixedSchedule && isEmpty.sleepTime
            ? defaultSchedule
            : fixedAndSleepTimeSchedule()
          : defaultSchedule.map((scheduleTime) => ({
              ...scheduleTime,
              times:
                schedule.schedules.find(
                  (s) => s.time_point === scheduleTime.time_point,
                )?.times || [],
            })),
      },
    ];

    setInitialSchedule(initialSchedule);
    setSchedules(initialSchedule);

    function fixedAndSleepTimeSchedule() {
      return (
        event.ranges.map((time_point) => ({
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
          mySchedule?.find(
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
  }, [event, schedule, mySchedule, sleepTime, isEmpty, sleepTimesList]);

  return {
    schedules,
    setSchedules,
    isScheduleEmpty: isEmpty.schedule,
    isFixedScheduleEmpty: isEmpty.fixedSchedule,
    isSleepTimeEmpty: isEmpty.sleepTime,
    initialSchedule,
  };
}
