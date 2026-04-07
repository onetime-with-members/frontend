import { deleteCookie, getCookie } from 'cookies-next';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

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
  const [eventId, setEventId] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const code = searchParams.get('code');

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

  const isCompleted = isPending || isSuccess;

  useEffect(() => {
    const eventId = getCookie(TALK_CALENDAR_EVENT_ID) as string;
    setEventId(eventId);
    deleteCookie(TALK_CALENDAR_EVENT_ID);
  }, []);

  useEffect(() => {
    (async () => {
      if (isEventPending || isCompleted || !code || !eventId) return;

      if (isError) {
        router.push({
          pathname: `/events/view/${eventId}`,
          query: {
            calendar_status: TALK_CALENDAR_ERROR,
          },
        });
        return;
      }

      const accessToken = await getKakaoAccessToken({
        code,
        redirect: '/events/talk-calendar',
      });
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
  }, [event, isEventPending, isCompleted, isError]);

  return null;
}
