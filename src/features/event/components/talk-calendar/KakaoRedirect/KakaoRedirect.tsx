import { useEffect, useRef } from 'react';

import { getKakaoAuthCode } from '@/features/auth/api/auth.api';
import { TALK_CALENDAR_EVENT_ID } from '@/features/event/constants';
import { useSearchParams } from 'next/navigation';

export default function KakaoRedirect() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const searchParams = useSearchParams();

  const eventIdParam = searchParams.get('event_id');

  function handleAutoClick() {
    if (!eventIdParam) return;
    sessionStorage.setItem(TALK_CALENDAR_EVENT_ID, eventIdParam);
    getKakaoAuthCode();
  }

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        buttonRef.current?.click();
      }, 1000);
    })();
  }, []);

  return <button ref={buttonRef} onClick={handleAutoClick}></button>;
}
