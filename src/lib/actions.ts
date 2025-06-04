'use server';

import { accessToken } from './auth';
import { SERVER_API_URL } from './constants';
import { revalidatePath } from 'next/cache';

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
    throw new Error('Failed to update profile');
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
    throw new Error('Failed to update profile');
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
    throw new Error('Failed to update profile');
  }

  revalidatePath('/mypage/schedules/edit');
}
