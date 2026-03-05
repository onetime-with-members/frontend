import { eventQueryOptions } from '@/features/event/api/event.option';
import { getTalkCalendarEventCookie } from '@/features/event/lib/talk-calendar-event-cookie';
import EventTalkCalendarPage from '@/features/event/pages/EventTalkCalendarPage';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ event_id: string }>;
}) {
  const { event_id: eventIdParam } = await searchParams;

  const eventIdCookie = await getTalkCalendarEventCookie();

  const eventId = eventIdParam ?? eventIdCookie;

  if (!eventId) {
    redirect('/');
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...eventQueryOptions(eventId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventTalkCalendarPage eventId={eventId} />
    </HydrationBoundary>
  );
}
