import { weekdaysShortKo } from '@/lib/constants';
import { fetchEvent, fetchRecommendedTimes } from '@/lib/data';
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

      return event;
    },
    retry: false,
    enabled: !!eventId,
  });

export const useRecommendedTimesQuery = (eventId: string | undefined) =>
  useQuery<RecommendScheduleType[]>({
    queryKey: ['events', eventId, 'most'],
    queryFn: async () => await fetchRecommendedTimes(eventId || ''),
    enabled: !!eventId,
  });
