import { useEffect } from 'react';

import { getKakaoAuthCode } from '@/features/auth/api/auth.api';
import { addTalkCalendarEventCookie } from '@/features/event/lib/talk-calendar-event-cookie';
import { useSearchParams } from 'next/navigation';

export default function KakaoRedirect() {
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const eventIdParam = searchParams.get('event_id');

  useEffect(() => {
    if (!code && eventIdParam) {
      (async () => {
        await addTalkCalendarEventCookie(eventIdParam);
        getKakaoAuthCode('/events/talk-calendar');
      })();
    }
  }, [code, eventIdParam]);

  return null;
}
