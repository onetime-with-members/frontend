import { MyScheduleTimeType, SleepTimeType } from '../types';
import { weekdaysShortKo } from '@/constants';

export const MY_SCHEDULE_REQUEST_MODAL_SESSION = 'my_schedule_request_modal';

export const defaultMySchedule: MyScheduleTimeType[] = weekdaysShortKo.map(
  (weekday) => ({
    time_point: weekday,
    times: [],
  }),
);

export const defaultSleepTime: SleepTimeType = {
  sleep_start_time: '00:00',
  sleep_end_time: '00:00',
};
