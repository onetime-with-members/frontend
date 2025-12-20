import {
  exampleEventList,
  exampleParticipantsList,
  exampleRecommendedTimesList,
} from '../mocks/example-events';
import { EventType, ParticipantType } from '../types';
import {
  fetchEvent,
  fetchEventWithAuth,
  fetchParticipants,
  fetchQrCode,
  fetchRecommendedTimes,
  fetchShortUrl,
} from './event.api';
import { queryOptions } from '@tanstack/react-query';

const exampleEventQueryOptions = (eventId: string) => ({
  initialData: () => {
    let result = undefined;
    exampleEventList.forEach((exampleEvent) => {
      if (exampleEvent.event_id.includes(eventId)) {
        result = exampleEvent;
        return;
      }
    });
    return result;
  },
  staleTime: exampleEventList
    .map((exampleEvent) => exampleEvent.event_id)
    .includes(eventId)
    ? Infinity
    : 0,
});

const exampleRecommendedTimesOptions = (eventId: string) => ({
  initialData: () => {
    let result = undefined;
    exampleRecommendedTimesList.forEach(
      ({ slug, result: exampleRecommendedTimes }) => {
        if (slug.includes(eventId)) {
          result = exampleRecommendedTimes;
          return;
        }
      },
    );
    return result;
  },
  staleTime: exampleRecommendedTimesList
    .map(({ slug }) => slug)
    .includes(eventId)
    ? Infinity
    : 0,
});

const exampleParticipantsOptions = (eventId: string) => ({
  initialData: () => {
    let result = undefined;
    exampleParticipantsList.forEach(({ slug, participants }) => {
      if (slug.includes(eventId)) {
        result = participants;
        return;
      }
    });
    return result;
  },
  staleTime: exampleRecommendedTimesList
    .map(({ slug }) => slug)
    .includes(eventId)
    ? Infinity
    : 0,
});

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
