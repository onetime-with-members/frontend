import { exampleEventStaleTime } from '@/features/event/api/example-event.option';
import { foundedExampleEvent } from '@/features/event/utils';

export const exampleSchedulesOptions = (eventId: string) => ({
  initialData: () => foundedExampleEvent(eventId)?.schedules,
  staleTime: exampleEventStaleTime(eventId),
});
