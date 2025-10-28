import { TimeType } from '@/features/schedule/types';

export type MyScheduleTimeType = TimeType;

export interface SleepTimeType {
  sleep_start_time: string;
  sleep_end_time: string;
}

export type EverytimeSchedule = TimeType[];
