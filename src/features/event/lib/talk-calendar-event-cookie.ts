'use server';

import { cookies } from 'next/headers';

export async function addTalkCalendarEventCookie(eventId: string) {
  const cookieStore = await cookies();
  cookieStore.set('talk-calendar-event-id', eventId);
}

export async function getTalkCalendarEventCookie() {
  const cookieStore = await cookies();
  const eventId = cookieStore.get('talk-calendar-event-id')?.value;
  return eventId;
}
