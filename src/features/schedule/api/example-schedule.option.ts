import {
  exampleEventStaleTime,
  foundedExampleEvent,
} from '@/features/event/api/example-event.option';

export const exampleSchedulesOptions = (eventId: string) => ({
  initialData: () => foundedExampleEvent(eventId)?.schedules,
  staleTime: exampleEventStaleTime(eventId),
});
