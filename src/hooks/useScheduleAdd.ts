import { useContext, useEffect, useState } from 'react';

import { MyScheduleContext } from '@/contexts/my-schedule';
import { SleepTimeContext } from '@/contexts/sleep-time';
import { useEventQuery } from '@/features/event/api/events.query';
import { MyScheduleTimeType, SleepTime } from '@/features/my-schedule/models';
import { useScheduleDetailQuery } from '@/features/schedule/api/schedule.query';
import { ScheduleType, TimeType } from '@/features/schedule/models';
import { weekdaysShortKo } from '@/lib/constants';
import dayjs from '@/lib/dayjs';
import { timeBlockList } from '@/lib/utils';

export default function useScheduleAdd({
  isLoggedIn,
  guestId,
  eventId,
}: {
  isLoggedIn: boolean;
  guestId: string;
  eventId: string;
}) {
  const [initialSchedule, setInitialSchedule] = useState<ScheduleType[]>([]);
  const [scheduleValue, setScheduleValue] = useState<ScheduleType[]>([
    new ScheduleType({
      name: '본인',
      schedules: [],
    }),
  ]);

  const { mySchedule } = useContext(MyScheduleContext);
  const { sleepTime, sleepTimesList } = useContext(SleepTimeContext);

  const { data: event } = useEventQuery(eventId);
  const { data: schedule } = useScheduleDetailQuery({
    event,
    isLoggedIn,
    guestId,
  });
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
    const defaultSchedule = event.ranges.map(
      (time_point) =>
        new TimeType({
          time_point,
          times: [],
        }),
    );

    const newSchedules = isEmpty.schedule
      ? isEmpty.fixedSchedule && isEmpty.sleepTime
        ? defaultSchedule
        : fixedAndSleepTimeSchedule()
      : defaultSchedule.map(
          (scheduleTime) =>
            new TimeType({
              time_point: scheduleTime.timePoint,
              times:
                schedule?.schedules.find(
                  (s) => s.timePoint === scheduleTime.timePoint,
                )?.times || [],
            }),
        );

    const initialSchedule: ScheduleType[] = [
      new ScheduleType({
        name: schedule.name,
        schedules: newSchedules.map((schedule) => schedule.toRemoteType()),
      }),
    ];

    setInitialSchedule(initialSchedule);
    setScheduleValue(initialSchedule);

    function fixedAndSleepTimeSchedule() {
      return (
        event?.ranges.map(
          (time_point) =>
            new TimeType({
              time_point,
              times: newTimes(
                event.startTime,
                event.endTime,
                fixedScheduleTimes(time_point, event.category),
                sleepTimesList,
              ),
            }),
        ) || defaultSchedule
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
              weekdayIndex(fixedSchedule.timePoint, 'DAY'),
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
    scheduleValue,
    setScheduleValue,
    isScheduleEmpty: isEmpty.schedule,
    isFixedScheduleEmpty: isEmpty.fixedSchedule,
    isSleepTimeEmpty: isEmpty.sleepTime,
    initialSchedule,
  };
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

function isSleepTimeEmpty(sleepTimeData: SleepTime | undefined) {
  return sleepTimeData
    ? sleepTimeData.endTime === sleepTimeData.startTime
    : true;
}
