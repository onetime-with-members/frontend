import { EventType } from '@/types/event.type';
import { ScheduleType } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export const useScheduleQuery = (event: EventType | undefined) =>
  useQuery<ScheduleType[]>({
    queryKey: ['schedules', event?.category?.toLowerCase(), event?.event_id],
    queryFn: async () => {
      const res = await axios.get(
        `/schedules/${event?.category.toLowerCase()}/${event?.event_id}`,
      );
      return res.data.payload;
    },
    enabled: !!event,
  });
