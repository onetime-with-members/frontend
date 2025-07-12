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

export async function createUserAction(value: OnboardingValueType) {
  const res = await axios.post('/users/onboarding', value);
  return res.data.payload;
}

export async function createEventAction(event: EventValueType) {
  const res = await axios.post('/events', event);
  return res.data.payload;
}

export async function editEventAction({
  eventId,
  event,
}: {
  eventId: string;
  event: EventValueType;
}) {
  const res = await axios.patch(`/events/${eventId}`, event);
  return res.data.payload;
}

export async function deleteEventAction(eventId: string) {
  const res = await axios.delete(`/events/${eventId}`);
  return res.data.payload;
}

export async function editUserNameAction(name: string) {
  const res = await axios.patch('/users/profile/action-update', {
    nickname: name,
  });
  return res.data.payload;
}

export async function editUserLanguageAction(language: 'KOR' | 'ENG') {
  const res = await axios.patch('/users/profile/action-update', {
    language,
  });
  return res.data.payload;
}

export async function editUserPolicyAction(policy: PolicyType) {
  const res = await axios.put('/users/policy', policy);
  return res.data.payload;
}

export async function editMyScheduleAction(mySchedule: MyScheduleTimeType[]) {
  const res = await axios.put('/fixed-schedules', {
    schedules: mySchedule,
  });
  return res.data.payload;
}

export async function editSleepTimeAction(sleepTime: SleepTimeType) {
  const res = await axios.put('/users/sleep-time', sleepTime);
  return res.data.payload;
}

export async function submitEverytimeUrlAction(url: string) {
  const res = await axios.get(`${CRAWLING_SERVER_API_URL}/schedule`, {
    params: {
      url,
    },
  });
  return res.data.payload.schedules;
}

export async function withdrawAction() {
  const res = await axios.post('/users/action-withdraw');
  return res.data.payload;
}

export async function checkNewGuestAction({
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

export async function loginGuestAction({
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

export async function createNewMemberScheduleAction({
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

export async function updateScheduleAction({
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

export async function signInAction({
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

export async function signOutAction() {
  const { refreshToken }: Session = JSON.parse(getCookie('session') as string);
  const res = await axios.post('/users/logout', {
    refresh_token: refreshToken,
  });
  await deleteCookie('session');
  return res.data.payload;
}
