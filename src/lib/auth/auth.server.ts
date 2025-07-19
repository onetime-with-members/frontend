'use server';

import { cookies } from 'next/headers';

export default async function auth() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  return { isLoggedIn: !!sessionCookie };
}
