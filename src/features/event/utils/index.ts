import { exampleEventList } from '../mocks/example-events';

export const foundedExampleEvent = (eventId: string) =>
  exampleEventList.find(({ slug }) => slug.includes(eventId));

export const isExampleEventSlug = (eventId: string) =>
  !!foundedExampleEvent(eventId);
