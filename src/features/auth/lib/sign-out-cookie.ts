'use server';

import { deleteCookie, setCookie } from 'cookies-next';

import dayjs from '@/lib/dayjs';
import { cookies } from 'next/headers';

export async function addSignOutCookie() {
  setCookie('sign-out', String(true), {
    expires: dayjs().add(1, 'hour').toDate(),
  });
}

export async function hasSignOutCookie() {
  const cookieStore = await cookies();
  return !!cookieStore.get('sign-out')?.value;
}

export async function deleteSignOutCookie() {
  deleteCookie('sign-out');
}
