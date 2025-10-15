import { defaultSleepTime } from '../constants';
import { MyScheduleTimeType } from '../models/MyScheduleTimeType';
import { SleepTimeType } from '../models/SleepTimeType';
import { fetchMySchedule, fetchSleepTime } from './my-schedule.api';
import { queryOptions } from '@tanstack/react-query';

export const myScheduleQueryOptions = queryOptions<MyScheduleTimeType[]>({
  queryKey: ['fixed-schedules'],
  queryFn: fetchMySchedule,
});

export const sleepTimeQueryOptions = queryOptions<SleepTimeType>({
  queryKey: ['users', 'sleep-time'],
  queryFn: fetchSleepTime,
  placeholderData: defaultSleepTime,
});
