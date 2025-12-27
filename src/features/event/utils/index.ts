import { exampleEventList } from '../mocks/example-events';

export const foundExampleEvent = (eventId: string) =>
  exampleEventList.find(({ slug }) => slug.includes(eventId));

export const isExampleEventSlug = (eventId: string) =>
  !!foundExampleEvent(eventId);
