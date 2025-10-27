'use client';

import { useEventQuery } from '../api/events.query';
import EventFormScreen from '../components/form/EventFormScreen';

export default function EventEditPage({ eventId }: { eventId: string }) {
  const { data: event } = useEventQuery(eventId);

  return <EventFormScreen formStatus="edit" originData={event.toFormType()} />;
}
