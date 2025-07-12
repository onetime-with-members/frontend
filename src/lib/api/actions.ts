import { AxiosError } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import { CRAWLING_SERVER_API_URL } from '../constants';
import dayjs from '../dayjs';
import {
  EventType,
  EventValueType,
  MyScheduleTimeType,
  OnboardingValueType,
  PolicyType,
  ScheduleType,
  Session,
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

export async function editUserLanguageApi(language: 'KOR' | 'ENG') {
  const res = await axios.patch('/users/profile/action-update', {
    language,
  });
  return res.data.payload;
}

export async function editUserPolicyApi(policy: PolicyType) {
  const res = await axios.put('/users/policy', policy);
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

export async function checkNewGuestApi({
  eventId,
  name,
}: {
  eventId: string;
  name: string;
}) {
  const res = await axios.post('/members/name/action-check', {
    event_id: eventId,
    name,
  });
  return res.data.payload;
}

export async function loginGuestApi({
  eventId,
  name,
  pin,
}: {
  eventId: string;
  name: string;
  pin: string;
}) {
  try {
    const res = await axios.post('/members/action-login', {
      event_id: eventId,
      name,
      pin,
    });
    return {
      guestId: res.data.payload.member_id as string,
      pinNotCorrect: false,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.status === 404) {
      return { guestId: '', pinNotCorrect: true };
    }
    return { guestId: '', pinNotCorrect: false };
  }
}

export async function createNewMemberScheduleApi({
  eventId,
  name,
  pin,
  schedule,
}: {
  eventId: string;
  name: string;
  pin: string;
  schedule: ScheduleType['schedules'];
}) {
  const res = await axios.post('/members/action-register', {
    event_id: eventId,
    name,
    pin,
    schedules: schedule,
  });
  return res.data.payload;
}

export async function updateScheduleApi({
  event,
  guestId,
  schedule,
}: {
  event: EventType;
  guestId: string;
  schedule: ScheduleType['schedules'];
}) {
  const res = await axios.post(`/schedules/${event.category.toLowerCase()}`, {
    event_id: event.event_id,
    member_id: guestId,
    schedules: schedule,
  });
  return res.data.payload;
}

export async function signInApi({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const newSession: Session = {
    accessToken,
    refreshToken,
  };
  await setCookie('session', JSON.stringify(newSession), {
    expires: dayjs().add(1, 'month').toDate(),
  });
  return newSession;
}

export async function signOutApi() {
  const { refreshToken }: Session = JSON.parse(getCookie('session') as string);
  const res = await axios.post('/users/logout', {
    refresh_token: refreshToken,
  });
  await deleteCookie('session');
  return res.data.payload;
}
