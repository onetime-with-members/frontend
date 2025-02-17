import { EventType } from '@/types/event.type';
import { RecommendScheduleType } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { sortWeekdayList } from '@/utils/weekday';
import { useQuery } from '@tanstack/react-query';

export const useEventQuery = (eventId: string | undefined) =>
  useQuery<EventType>({
    queryKey: ['events', eventId],
    queryFn: async () => {
      const res = await axios.get(`/events/${eventId}`);
      const event = res.data.payload;

      if (event.category === 'DAY') {
        event.ranges = sortWeekdayList(event.ranges);
      } else {
        event.ranges = event.ranges?.sort();
      }

      return event;
    },
    retry: false,
    enabled: !!eventId,
  });

export const useRecommendTimesQuery = (eventId: string | undefined) =>
  useQuery<RecommendScheduleType[]>({
    queryKey: ['events', eventId, 'most'],
    queryFn: async () => {
      const res = await axios.get(`/events/${eventId}/most`);
      return res.data.payload;
    },
    enabled: !!eventId,
  });
