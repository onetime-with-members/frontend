'use server';

import { accessToken, auth } from './auth';
import { SERVER_API_URL } from './constants';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createEvent(formData: FormData) {
  const event = JSON.parse(formData.get('event') as string);

  const res = await fetch(`${SERVER_API_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...((await auth())
        ? { Authorization: `Bearer ${await accessToken()}` }
        : {}),
    },
    body: JSON.stringify({
      ...event,
    }),
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to create event');
  }
  const data = await res.json();
  const { event_id } = data.payload;

  redirect(`/events/${event_id}`);
}

export async function editEvent(formData: FormData) {
  const eventId = formData.get('eventId') as string;
  const event = JSON.parse(formData.get('event') as string);

  const res = await fetch(`${SERVER_API_URL}/events/${eventId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await accessToken()}`,
    },
    body: JSON.stringify(event),
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to edit event');
  }

  revalidatePath(`/events/${eventId}`);

  redirect(`/events/${eventId}`);
}

export async function editProfile(formData: FormData) {
  const name = formData.get('nickname') as string;

  const res = await fetch(`${SERVER_API_URL}/users/profile/action-update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await accessToken()}`,
    },
    body: JSON.stringify({
      nickname: name,
    }),
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to edit profile');
  }

  revalidatePath('/mypage/profile');
}

export async function editMySchedule(formData: FormData) {
  const mySchedule = JSON.parse(formData.get('mySchedule') as string);

  const res = await fetch(`${SERVER_API_URL}/fixed-schedules`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await accessToken()}`,
    },
    body: JSON.stringify({
      schedules: mySchedule,
    }),
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to edit my schedule');
  }

  revalidatePath('/mypage/schedules/edit');
}

export async function editSleepTime(formData: FormData) {
  const sleepTime = JSON.parse(formData.get('sleepTime') as string);

  const res = await fetch(`${SERVER_API_URL}/users/sleep-time`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await accessToken()}`,
    },
    body: JSON.stringify(sleepTime),
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to edit sleep time');
  }

  revalidatePath('/');
  revalidatePath('/mypage/schedules/edit');
}
