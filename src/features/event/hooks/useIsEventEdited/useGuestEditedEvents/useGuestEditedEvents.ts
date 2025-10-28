import { getCookie, hasCookie, setCookie } from 'cookies-next';

import { EDITED_EVENTS_COOKIE_KEY } from '../../../constants';
import { useAuth } from '@/lib/auth/auth.client';
import dayjs from '@/lib/dayjs';

export default function useGuestEditedEvents() {
  const { isLoggedIn } = useAuth();

  async function getEditedEvents(): Promise<string[]> {
    const hasEditedEventsCookie = await hasCookie(EDITED_EVENTS_COOKIE_KEY);
    const editedEventsJSON = await getCookie(EDITED_EVENTS_COOKIE_KEY);
    return hasEditedEventsCookie ? JSON.parse(editedEventsJSON as string) : [];
  }

  async function appendToEditedEvent(eventId: string) {
    const editedEvents = await getEditedEvents();
    return Array.from(new Set([...editedEvents, eventId]));
  }

  async function addNewEditedEvent(eventId: string) {
    if (isLoggedIn) return;
    await setCookie(
      EDITED_EVENTS_COOKIE_KEY,
      JSON.stringify(await appendToEditedEvent(eventId)),
      {
        expires: dayjs().add(7, 'days').toDate(),
      },
    );
  }

  async function isGuestEditedEvent(eventId: string) {
    const editedEvents = await getEditedEvents();
    return editedEvents.includes(eventId);
  }

  return { addNewEditedEvent, isGuestEditedEvent };
}
