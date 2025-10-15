import { MyScheduleTimeType, SleepTimeType } from '../models';
import { weekdaysShortKo } from '@/lib/constants';

export const defaultSleepTime: SleepTimeType = {
  sleep_start_time: '00:00',
  sleep_end_time: '00:00',
};

export const defaultMySchedule: MyScheduleTimeType[] = weekdaysShortKo.map(
  (weekday) => ({
    time_point: weekday,
    times: [],
  }),
);
