import { EventType, ParticipantType } from '../types';
import {
  fetchEvent,
  fetchEventWithAuth,
  fetchParticipants,
  fetchQrCode,
  fetchRecommendedTimes,
  fetchShortUrl,
} from './event.api';
import {
  exampleEventQueryOptions,
  exampleParticipantsOptions,
  exampleRecommendedTimesOptions,
} from './example-event.option';
import { queryOptions } from '@tanstack/react-query';

export const eventQueryOptions = (eventId: string) =>
  queryOptions<EventType | null>({
    queryKey: ['events', eventId],
    queryFn: async () => await fetchEvent(eventId),
    ...exampleEventQueryOptions(eventId),
  });

export const eventWithAuthQueryOptions = (eventId: string) =>
  queryOptions<EventType>({
    queryKey: ['events', eventId, '_user'],
    queryFn: async () => await fetchEventWithAuth(eventId),
    ...exampleEventQueryOptions(eventId),
  });

export const eventShortUrlQueryOptions = (url: string) =>
  queryOptions({
    queryKey: ['urls', 'action-shorten', url],
    queryFn: async () => await fetchShortUrl(url),
  });

export const recommendedTimesQueryOptions = (eventId: string) =>
  queryOptions({
    queryKey: ['events', eventId, 'most'],
    queryFn: async () => await fetchRecommendedTimes(eventId),
    ...exampleRecommendedTimesOptions(eventId),
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
    ...exampleParticipantsOptions(eventId),
  });
