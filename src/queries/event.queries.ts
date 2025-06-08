import axios from '@/lib/axios';
import { weekdaysShortKo } from '@/lib/constants';
import { fetchEvent } from '@/lib/data';
import { EventType, RecommendScheduleType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export const useEventQuery = (eventId: string) =>
  useQuery<EventType>({
    queryKey: ['events', eventId],
    queryFn: async () => {
      const event = await fetchEvent(eventId);

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
    retry: false,
    enabled: !!eventId,
  });

export const useRecommendedTimesQuery = (eventId: string | undefined) =>
  useQuery<RecommendScheduleType[]>({
    queryKey: ['events', eventId, 'most'],
    queryFn: async () => {
      const res = await axios.get(`/events/${eventId}/most`);
      return res.data.payload;
    },
    enabled: !!eventId,
  });
