import { MyScheduleTimeType } from '../models';
import { weekdaysShortKo } from '@/lib/constants';

export const defaultMySchedule: MyScheduleTimeType[] = weekdaysShortKo.map(
  (weekday) => ({
    time_point: weekday,
    times: [],
  }),
);
