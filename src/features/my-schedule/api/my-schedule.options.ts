import { defaultSleepTime } from '../constants';
import { MyScheduleTimeType, SleepTimeType } from '../types';
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
