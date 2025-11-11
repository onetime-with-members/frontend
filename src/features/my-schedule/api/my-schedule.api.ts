import { defaultMySchedule } from '../constants';
import { MyScheduleTimeType, SleepTimeType } from '../types';
import { CRAWLING_SERVER_API_KEY, CRAWLING_SERVER_API_URL } from '@/constants';
import apiClient from '@/lib/api';

export async function fetchMySchedule() {
  const res = await apiClient.get('/fixed-schedules');
  const myScheduleData: MyScheduleTimeType[] = res.data.payload.schedules;
  const mySchedule =
    myScheduleData.length !== 7
      ? defaultMySchedule.map((s1) => ({
          time_point: s1.time_point,
          times:
            myScheduleData.find((s2) => s1.time_point === s2.time_point)
              ?.times || [],
        }))
      : myScheduleData;
  return mySchedule;
}

export async function fetchSleepTime() {
  const res = await apiClient.get('/users/sleep-time');
  return res.data.payload;
}

export async function editMyScheduleAction(mySchedule: MyScheduleTimeType[]) {
  const res = await apiClient.put('/fixed-schedules', {
    schedules: mySchedule,
  });
  return res.data.payload;
}

export async function editSleepTimeAction(sleepTime: SleepTimeType) {
  const res = await apiClient.put('/users/sleep-time', sleepTime);
  return res.data.payload;
}

export async function submitEverytimeUrlAction(url: string) {
  const res = await apiClient.get(`${CRAWLING_SERVER_API_URL}/schedule`, {
    headers: {
      'X-API-Key': CRAWLING_SERVER_API_KEY,
    },
    params: {
      url,
    },
  });
  return res.data.payload.schedules;
}
