import { MyScheduleTimeType } from '../models';
import { TimeType } from '@/features/schedule/models';
import { weekdaysShortKo } from '@/lib/constants';

export const defaultMySchedule: MyScheduleTimeType[] = weekdaysShortKo.map(
  (weekday) =>
    new TimeType({
      time_point: weekday,
      times: [],
    }),
);
