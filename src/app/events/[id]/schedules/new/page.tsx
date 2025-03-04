import ScheduleAddPage from './components/ScheduleAddPage';
import { EventType } from '@/types/event.type';
import axios from '@/utils/axios';
import { getQueryClient } from '@/utils/get-query-client';
import { weekdaysShortKo } from '@/utils/weekday';

export default async function ScheduleAdd({
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

      const shortenActionRes = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}/urls/action-shorten`,
        {
          original_url: `${window.location.origin}/events/${event.event_id}`,
        },
      );
      event.shortenUrl = shortenActionRes.data.payload.shorten_url;

      return event;
    },
  });

  const event = queryClient.getQueryData<EventType>(['events', id]);

  await queryClient.prefetchQuery({
    queryKey: ['schedules', event?.category?.toLowerCase(), event?.event_id],
    queryFn: async () => {
      const res = await axios.get(
        `/schedules/${event?.category.toLowerCase()}/${event?.event_id}`,
      );
      return res.data.payload;
    },
  });

  const isLoggedIn =
    typeof localStorage !== 'undefined' &&
    localStorage.getItem('access-token') !== null;
  const guestId = 'other';

  await queryClient.prefetchQuery({
    queryKey: [
      'schedules',
      event?.category?.toLowerCase(),
      event?.event_id,
      isLoggedIn ? 'user' : guestId,
    ],
    queryFn: async () => {
      const res = await axios.get(
        `/schedules/${event?.category?.toLowerCase()}/${event?.event_id}/${isLoggedIn ? 'user' : guestId}`,
      );
      return res.data.payload;
    },
  });

  return <ScheduleAddPage />;
}
