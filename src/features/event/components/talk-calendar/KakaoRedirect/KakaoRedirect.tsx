import { useEffect, useRef } from 'react';

import { getKakaoAuthCode } from '@/features/auth/api/auth.api';
import { addTalkCalendarEventCookie } from '@/features/event/lib/talk-calendar-event-cookie';
import { useSearchParams } from 'next/navigation';

export default function KakaoRedirect() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const searchParams = useSearchParams();

  const eventIdParam = searchParams.get('event_id');

  function handleClick() {
    getKakaoAuthCode('/events/talk-calendar');
  }

  useEffect(() => {
    (async () => {
      if (eventIdParam) {
        await addTalkCalendarEventCookie(eventIdParam);
        setTimeout(() => {
          buttonRef.current?.click();
        }, 500);
      }
    })();
  }, [eventIdParam]);

  return <button ref={buttonRef} onClick={handleClick}></button>;
}
