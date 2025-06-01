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
