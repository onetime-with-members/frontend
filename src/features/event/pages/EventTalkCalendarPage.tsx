'use client';

import { useEffect } from 'react';

import {
  getKakaoAccessToken,
  redirectToKakaoAuth,
} from '../../auth/lib/kakao-auth';
import { createTalkCalendarEvent } from '../api/event.api';
import { useEventQuery } from '../api/event.query';
import { addTalkCalendarEventCookie } from '../lib/talk-calendar-event-cookie';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export default function EventTalkCalendarPage({
  eventId,
}: {
  eventId: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const eventIdParam = searchParams.get('event_id');

  const { data: event } = useEventQuery(eventId);

  useEffect(() => {
    (async () => {
      if (!code && eventIdParam) {
        await addTalkCalendarEventCookie(eventIdParam);
        redirectToKakaoAuth('/events/talk-calendar');
      }
    })();
  }, [code, eventIdParam]);

  useEffect(() => {
    (async () => {
      if (!code) return;
      const accessToken = await getKakaoAccessToken(
        code,
        '/events/talk-calendar',
      );
      await createTalkCalendarEvent(accessToken, event);
      router.push(`/events/view/${eventId}`);
    })();
  }, [code, event]);

  return null;
}
