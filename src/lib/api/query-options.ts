import {
  Banner,
  EventType,
  ParticipantType,
  RecommendScheduleType,
  ScheduleType,
} from '../types';
import { PolicyFormType } from '../validation/form-types';
import {
  fetchBanner,
  fetchEvent,
  fetchEventWithAuth,
  fetchParticipants,
  fetchQrCode,
  fetchRecommendedTimes,
  fetchScheduleDetail,
  fetchSchedules,
  fetchShortenUrl,
  fetchUserPolicy,
} from './data';
import { queryOptions } from '@tanstack/react-query';

export const eventQueryOptions = (eventId: string) =>
  queryOptions<EventType | null>({
    queryKey: ['events', eventId],
    queryFn: async () => await fetchEvent(eventId),
  });

export const eventWithAuthQueryOptions = (eventId: string) =>
  queryOptions<EventType>({
    queryKey: ['events', eventId, '_user'],
    queryFn: async () => await fetchEventWithAuth(eventId),
  });

export const shortenUrlQueryOptions = (url: string) =>
  queryOptions({
    queryKey: ['urls', 'action-shorten'],
    queryFn: async () => await fetchShortenUrl(url),
  });

export const recommendedTimesQueryOptions = (eventId: string) =>
  queryOptions({
    queryKey: ['events', eventId, 'most'],
    queryFn: async () => await fetchRecommendedTimes(eventId),
  });

export const filteredRecommendedTimesQueryOptions = (eventId: string) =>
  queryOptions<RecommendScheduleType[]>({
    queryKey: ['events', eventId, 'filtering'],
    queryFn: () => [],
  });

export const filteredSchedulesQueryOptions = ({
  eventId,
  category,
}: {
  eventId: string;
  category: EventType['category'];
}) =>
  queryOptions<ScheduleType[]>({
    queryKey: ['schedules', category.toLowerCase(), eventId, 'filtering'],
    queryFn: () => [],
  });

export const qrCodeQueryOptions = (eventId: string) =>
  queryOptions({
    queryKey: ['events', 'qr', eventId],
    queryFn: async () => await fetchQrCode(eventId),
  });

export const schedulesQueryOptions = (event: EventType) =>
  queryOptions({
    queryKey: ['schedules', event.category.toLowerCase(), event.event_id],
    queryFn: async () => await fetchSchedules(event),
  });

export const scheduleDetailQueryOptions = ({
  event,
  isLoggedIn,
  guestId,
}: {
  event: EventType;
  isLoggedIn: boolean;
  guestId?: string;
}) =>
  queryOptions<ScheduleType>({
    queryKey: [
      'schedules',
      event.category.toLowerCase(),
      event.event_id,
      isLoggedIn ? 'user' : guestId,
    ],
    queryFn: async () =>
      await fetchScheduleDetail({ event, isLoggedIn, guestId }),
  });

export const participantsQueryOptions = (eventId: string) =>
  queryOptions<ParticipantType[]>({
    queryKey: ['events', eventId, 'participants'],
    queryFn: async () => await fetchParticipants(eventId),
  });

export const userPolicyQueryOptions = queryOptions<PolicyFormType>({
  queryKey: ['users', 'policy'],
  queryFn: fetchUserPolicy,
});

export const bannerQueryOptions = queryOptions<Banner[]>({
  queryKey: ['banner'],
  queryFn: fetchBanner,
});
