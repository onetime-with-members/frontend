import { CRAWLING_SERVER_API_URL } from '../constants';
import {
  EventValueType,
  MyScheduleTimeType,
  OnboardingValueType,
  PolicyType,
  SleepTimeType,
} from '../types';
import axios from './axios';

export async function createUserApi(value: OnboardingValueType) {
  const res = await axios.post('/users/onboarding', value);
  return res.data.payload;
}

export async function createEventApi(event: EventValueType) {
  const res = await axios.post('/events', event);
  return res.data.payload;
}

export async function editEventApi({
  eventId,
  event,
}: {
  eventId: string;
  event: EventValueType;
}) {
  const res = await axios.patch(`/events/${eventId}`, event);
  return res.data.payload;
}

export async function deleteEventApi(eventId: string) {
  const res = await axios.delete(`/events/${eventId}`);
  return res.data.payload;
}

export async function editUserNameApi(name: string) {
  const res = await axios.patch('/users/profile/action-update', {
    nickname: name,
  });
  return res.data.payload;
}

export async function editUserPolicyApi(policy: PolicyType) {
  const res = await axios.patch('/users/profile/action-update', policy);
  return res.data.payload;
}

export async function editMyScheduleApi(mySchedule: MyScheduleTimeType[]) {
  const res = await axios.put('/fixed-schedules', {
    schedules: mySchedule,
  });
  return res.data.payload;
}

export async function editSleepTimeApi(sleepTime: SleepTimeType) {
  const res = await axios.put('/users/sleep-time', sleepTime);
  return res.data.payload;
}

export async function submitEverytimeUrlApi(url: string) {
  const res = await axios.get(`${CRAWLING_SERVER_API_URL}/schedule`, {
    params: {
      url,
    },
  });
  return res.data.payload.schedules;
}

export async function withdrawApi() {
  const res = await axios.post('/users/action-withdraw');
  return res.data.payload;
}
