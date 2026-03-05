'use client';

import { useEventQuery } from '../api/event.query';
import EventForm from '../components/form/EventForm';

export default function EventEditPage({ eventId }: { eventId: string }) {
  const { data: event } = useEventQuery(eventId);

  return <EventForm formStatus="edit" originData={event} />;
}
