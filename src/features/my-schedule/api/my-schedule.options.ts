import { SleepTime } from '../models';
import { MyScheduleTimeType } from '../models/MyScheduleTimeType';
import { fetchMySchedule, fetchSleepTime } from './my-schedule.api';
import { queryOptions } from '@tanstack/react-query';

export const myScheduleQueryOptions = queryOptions<MyScheduleTimeType[]>({
  queryKey: ['fixed-schedules'],
  queryFn: fetchMySchedule,
});

export const sleepTimeQueryOptions = queryOptions<SleepTime>({
  queryKey: ['users', 'sleep-time'],
  queryFn: fetchSleepTime,
});
