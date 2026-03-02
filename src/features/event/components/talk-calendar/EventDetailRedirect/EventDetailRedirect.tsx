import { useEffect } from 'react';

import { useKakaoAccessTokenQuery } from '@/features/auth/api/auth.query';
import {
  useCreateTalkCalendarEventMutation,
  useEventQuery,
} from '@/features/event/api/event.query';
import {
  TALK_CALENDAR_ERROR,
  TALK_CALENDAR_SUCCESS,
} from '@/features/event/constants';
import { deleteTalkCalendarEventCookie } from '@/features/event/lib/talk-calendar-event-cookie';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export default function EventDetailRedirect({ eventId }: { eventId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code');

  const { data: event, isPending: isEventPending } = useEventQuery(eventId);
  const { data: kakaoAccessToken } = useKakaoAccessTokenQuery(
    code ?? '',
    '/events/talk-calendar',
    { enabled: !!code },
  );

  const {
    mutateAsync: createTalkCalendarEvent,
    isPending,
    isSuccess,
    isError,
  } = useCreateTalkCalendarEventMutation();

  useEffect(() => {
    (async () => {
      if (!kakaoAccessToken || isEventPending || isPending || isSuccess) return;

      if (isError) {
        await deleteTalkCalendarEventCookie();
        router.push(`/events/view/${eventId}?toast=${TALK_CALENDAR_ERROR}`);
        return;
      }

      await createTalkCalendarEvent({ accessToken: kakaoAccessToken, event });
      await deleteTalkCalendarEventCookie();
      router.push(`/events/view/${eventId}?toast=${TALK_CALENDAR_SUCCESS}`);
    })();
  }, [kakaoAccessToken, event, isEventPending, isPending, isSuccess, isError]);

  return null;
}
