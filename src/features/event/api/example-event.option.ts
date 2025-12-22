import { exampleEventList } from '../mocks/example-events';
import { foundExampleEvent } from '../utils';

export const exampleEventStaleTime = (eventId: string) =>
  exampleEventList
    .map((exampleEvent) => exampleEvent.event.event_id)
    .includes(eventId)
    ? Infinity
    : 0;

export const exampleEventQueryOptions = (eventId: string) => ({
  initialData: () => foundExampleEvent(eventId)?.event,
  staleTime: exampleEventStaleTime(eventId),
});

export const exampleRecommendedTimesOptions = (eventId: string) => ({
  initialData: () => foundExampleEvent(eventId)?.recommendedTimes,
  staleTime: exampleEventStaleTime(eventId),
});

export const exampleParticipantsOptions = (eventId: string) => ({
  initialData: () => foundExampleEvent(eventId)?.participants,
  staleTime: exampleEventStaleTime(eventId),
});

export const exampleShortUrlOptions = (url: string) => {
  const eventId = url.split('/').pop() ?? '';

  return {
    initialData: () => foundExampleEvent(eventId)?.shortUrl,
    staleTime: exampleEventStaleTime(eventId),
  };
};

export const exampleQrCodeOptions = (eventId: string) => ({
  initialData: () => foundExampleEvent(eventId)?.qrCode,
  staleTime: exampleEventStaleTime(eventId),
});
