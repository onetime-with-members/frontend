'use server';

import dayjs from '@/lib/dayjs';
import { cookies } from 'next/headers';

export async function addSignOutCookie() {
  const cookieStore = await cookies();
  cookieStore.set('sign-out', String(true), {
    expires: dayjs().add(1, 'hour').toDate(),
  });
}

export async function hasSignOutCookie() {
  const cookieStore = await cookies();
  return !!cookieStore.get('sign-out')?.value;
}

export async function deleteSignOutCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('sign-out');
}
