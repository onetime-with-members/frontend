import EventDetailPage from './components/EventDetailPage';
import { getQueryClient } from '@/app/get-query-client';
import { EventType } from '@/types/event.type';
import { ScheduleType } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { weekdaysShortKo } from '@/utils/weekday';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/events/${id}`,
  );

  const { payload: event } = await res.json();

  return {
    title: `${event?.title} | OneTime`,
  };
}

export default async function EventDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const queryClient = getQueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['events', id],
    queryFn: async () => {
      const res = await axios.get(`/events/${id}`);
      const event = res.data.payload;

      if (event.category === 'DAY') {
        event.ranges = weekdaysShortKo.filter((weekday) =>
          event.ranges.includes(weekday),
        );
      } else {
        event.ranges = event.ranges.sort();
      }

      const shortenActionRes = await axios.post('/urls/action-shorten', {
        original_url: `${typeof window !== 'undefined' && window.location.origin}/events/${event.event_id}`,
      });
      event.shortenUrl = shortenActionRes.data.payload.shorten_url;

      return event;
    },
  });

  const event: EventType | undefined = queryClient.getQueryData(['events', id]);

  await queryClient.prefetchQuery<ScheduleType[]>({
    queryKey: ['schedules', event?.category?.toLowerCase(), event?.event_id],
    queryFn: async () => {
      const res = await axios.get(
        `/schedules/${event?.category.toLowerCase()}/${event?.event_id}`,
      );
      return res.data.payload;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventDetailPage />
    </HydrationBoundary>
  );
}
