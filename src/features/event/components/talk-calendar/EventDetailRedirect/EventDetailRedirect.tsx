import { deleteCookie } from 'cookies-next';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';

import { useGetKakaoAccessTokenMutation } from '@/features/auth/api/auth.query';
import {
  useCreateTalkCalendarEventMutation,
  useEventQuery,
} from '@/features/event/api/event.query';
import {
  TALK_CALENDAR_ERROR,
  TALK_CALENDAR_EVENT_ID,
  TALK_CALENDAR_SUCCESS,
} from '@/features/event/constants';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export default function EventDetailRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const code = searchParams.get('code');
  const eventId = searchParams.get('event_id');

  const { data: event, isPending: isEventPending } = useEventQuery(
    eventId ?? '',
    { enabled: !!eventId },
  );

  const { getKakaoAccessToken } = useGetKakaoAccessTokenMutation();

  const {
    mutateAsync: createTalkCalendarEvent,
    isPending,
    isSuccess,
    isError,
  } = useCreateTalkCalendarEventMutation();

  useEffect(() => {
    (async () => {
      deleteCookie(TALK_CALENDAR_EVENT_ID);

      if (isEventPending || isPending || isSuccess || !code) return;

      if (isError) {
        router.push({
          pathname: `/events/view/${eventId}`,
          query: {
            calendar_status: TALK_CALENDAR_ERROR,
          },
        });
        return;
      }

      const accessToken = await getKakaoAccessToken(code);
      const { event_id: calendarEventId } = await createTalkCalendarEvent({
        accessToken,
        event,
        locale,
      });
      router.push({
        pathname: `/events/view/${eventId}`,
        query: {
          calendar_status: TALK_CALENDAR_SUCCESS,
          calendar_event_id: calendarEventId,
        },
      });
    })();
  }, [event, isEventPending, isPending, isSuccess, isError]);

  return null;
}
