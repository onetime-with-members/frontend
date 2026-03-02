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
        try {
          await addTalkCalendarEventCookie(eventIdParam);
        } catch (error) {
          // 배포 환경(특히 모바일 Safari)에서 정확히 어떤 에러인지 파악하기 위한 임시 알림
          alert(`쿠키/API 처리 실패: ${error}`);
          console.error('준비 중 오류:', error);
        } finally {
          // 앞의 작업이 성공하든 실패하든 무조건 카카오 화면으로 이동
          getKakaoAuthCode('/events/talk-calendar');
        }
      }
    })();
  }, [eventIdParam]);

  return null;
}
