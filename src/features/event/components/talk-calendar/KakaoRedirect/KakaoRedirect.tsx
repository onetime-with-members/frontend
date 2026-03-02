import { useEffect } from 'react';

import { getKakaoAuthCode } from '@/features/auth/api/auth.api';
import { addTalkCalendarEventCookie } from '@/features/event/lib/talk-calendar-event-cookie';
import { useSearchParams } from 'next/navigation';

export default function KakaoRedirect() {
  const searchParams = useSearchParams();

  const eventIdParam = searchParams.get('event_id');

  useEffect(() => {
    (async () => {
      if (eventIdParam) {
        await addTalkCalendarEventCookie(eventIdParam);
        getKakaoAuthCode('/events/talk-calendar');
      }
    })();
  }, [eventIdParam]);

  return <div></div>;
}
