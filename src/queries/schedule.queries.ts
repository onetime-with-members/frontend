import { EventType } from '@/types/event.type';
import { ScheduleType, TimeType } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { useMutation, useQuery } from '@tanstack/react-query';

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

export const useScheduleDetailQuery = ({
  event,
  guestId,
  isNewGuest,
  isLoggedIn,
}: {
  event: EventType | undefined;
  guestId: string;
  isNewGuest: boolean;
  isLoggedIn: boolean;
}) =>
  useQuery<ScheduleType>({
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
    enabled:
      event !== undefined && !isNewGuest && (isLoggedIn || guestId !== ''),
  });

export const useScheduleAndNewMemberCreate = ({
  event,
  guestValue,
  schedules,
  onSuccess,
}: {
  event: EventType | undefined;
  guestValue: {
    name: string;
    pin: string;
  };
  schedules: TimeType[];
  onSuccess: () => void;
}) =>
  useMutation({
    mutationFn: async () => {
      const res = await axios.post(`/members/action-register`, {
        event_id: event?.event_id,
        name: guestValue.name,
        pin: guestValue.pin,
        schedules,
      });
      return res.data;
    },
    onSuccess,
  });

export const useScheduleUpdateMutation = ({
  event,
  schedules,
  guestId,
  onSuccess,
}: {
  event: EventType | undefined;
  schedules: TimeType[];
  guestId: string;
  onSuccess: () => void;
}) =>
  useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `/schedules/${event?.category?.toLowerCase()}`,
        {
          event_id: event?.event_id,
          member_id: guestId,
          schedules,
        },
      );
      return res.data;
    },
    onSuccess,
  });
