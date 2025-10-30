import { AxiosError } from 'axios';

import { ScheduleType } from '../types';
import { SERVER_API_URL } from '@/constants';
import { EventType } from '@/features/event/types';
import apiClient from '@/lib/api';

export async function fetchSchedules(event: EventType) {
  if (!event.event_id) return [];

  const res = await fetch(
    `${SERVER_API_URL}/schedules/${event.category.toLowerCase()}/${event.event_id}`,
  );
  if (!res.ok) {
    console.error(await res.json());
    return [];
  }
  const data = await res.json();
  const schedules: ScheduleType[] = data.payload;

  return schedules;
}

export async function fetchScheduleDetail({
  event,
  isLoggedIn,
  guestId,
}: {
  event: EventType;
  isLoggedIn: boolean;
  guestId: string | undefined;
}) {
  const res = await apiClient.get(
    `/schedules/${event.category.toLowerCase()}/${event.event_id}/${isLoggedIn ? 'user' : guestId}`,
  );
  return res.data.payload;
}

export async function checkNewGuest({
  eventId,
  name,
}: {
  eventId: string;
  name: string;
}) {
  const res = await apiClient.post('/members/name/action-check', {
    event_id: eventId,
    name,
  });
  return res.data.payload;
}

export async function loginGuest({
  eventId,
  name,
  pin,
}: {
  eventId: string;
  name: string;
  pin: string;
}) {
  try {
    const res = await apiClient.post('/members/action-login', {
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

export async function createNewMemberSchedule({
  event,
  name,
  pin,
  schedule,
}: {
  event: EventType;
  name: string;
  pin: string;
  schedule: ScheduleType['schedules'];
}) {
  const res = await apiClient.post('/members/action-register', {
    event_id: event.event_id,
    name,
    pin,
    schedules: schedule,
  });
  return res.data.payload;
}

export async function updateSchedule({
  event,
  guestId,
  schedule,
}: {
  event: EventType;
  guestId: string;
  schedule: ScheduleType['schedules'];
}) {
  const res = await apiClient.post(
    `/schedules/${event.category.toLowerCase()}`,
    {
      event_id: event.event_id,
      member_id: guestId,
      schedules: schedule,
    },
  );
  return res.data.payload;
}
