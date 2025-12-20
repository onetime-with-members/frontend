import { exampleEventList } from '../mocks/example-events';

export const exampleEventStaleTime = (eventId: string) =>
  exampleEventList
    .map((exampleEvent) => exampleEvent.event.event_id)
    .includes(eventId)
    ? Infinity
    : 0;

export const foundedExampleEvent = (eventId: string) =>
  exampleEventList.find(({ slug }) => slug.includes(eventId));

export const exampleEventQueryOptions = (eventId: string) => ({
  initialData: () => foundedExampleEvent(eventId)?.event,
  staleTime: exampleEventStaleTime(eventId),
});

export const exampleRecommendedTimesOptions = (eventId: string) => ({
  initialData: () => foundedExampleEvent(eventId)?.recommendedTimes,
  staleTime: exampleEventStaleTime(eventId),
});

export const exampleParticipantsOptions = (eventId: string) => ({
  initialData: () => foundedExampleEvent(eventId)?.participants,
  staleTime: exampleEventStaleTime(eventId),
});

export const exampleShortUrlOptions = (url: string) => {
  const eventId = url.split('/').pop() ?? '';

  return {
    initialData: () => foundedExampleEvent(eventId)?.shortUrl,
    staleTime: exampleEventStaleTime(eventId),
  };
};

export const exampleQrCodeOptions = (eventId: string) => ({
  initialData: () => foundedExampleEvent(eventId)?.qrCode,
  staleTime: exampleEventStaleTime(eventId),
});
