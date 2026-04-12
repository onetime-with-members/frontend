import { eventQueryOptions } from '@/features/event/api/event.option';
import { TALK_CALENDAR_EVENT_ID } from '@/features/event/constants';
import EventTalkCalendarPage from '@/features/event/pages/EventTalkCalendarPage';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ event_id: string }>;
}) {
  const { event_id: eventIdParam } = await searchParams;

  const cookieStore = await cookies();
  const eventIdCookie = cookieStore.get(TALK_CALENDAR_EVENT_ID)?.value;

  const eventId = eventIdParam || eventIdCookie;

  if (!eventId) {
    redirect('/');
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...eventQueryOptions(eventId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventTalkCalendarPage />
    </HydrationBoundary>
  );
}
