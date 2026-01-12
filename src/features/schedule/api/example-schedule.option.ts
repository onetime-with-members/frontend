import { exampleEventStaleTime } from '@/features/event/api/example-event.option';
import { foundExampleEvent } from '@/features/event/utils';

export const exampleSchedulesOptions = (eventId: string) => ({
  initialData: () => foundExampleEvent(eventId)?.schedules,
  staleTime: exampleEventStaleTime(eventId),
});
