import {
  fetchEvent,
  fetchShortenUrl as fetchEventShortUrl,
  fetchEventWithAuth,
  fetchParticipants,
  fetchQrCode,
  fetchRecommendedTimes,
} from './events.api';
import { EventType, ParticipantType } from '@/lib/types';
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

export const eventShortUrlQueryOptions = (url: string) =>
  queryOptions({
    queryKey: ['urls', 'action-shorten'],
    queryFn: async () => await fetchEventShortUrl(url),
  });

export const recommendedTimesQueryOptions = (eventId: string) =>
  queryOptions({
    queryKey: ['events', eventId, 'most'],
    queryFn: async () => await fetchRecommendedTimes(eventId),
  });

export const qrCodeQueryOptions = (eventId: string) =>
  queryOptions({
    queryKey: ['events', 'qr', eventId],
    queryFn: async () => await fetchQrCode(eventId),
  });

export const participantsQueryOptions = (eventId: string) =>
  queryOptions<ParticipantType[]>({
    queryKey: ['events', eventId, 'participants'],
    queryFn: async () => await fetchParticipants(eventId),
  });
