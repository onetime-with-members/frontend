'use client';

import EventFormScreen from '@/components/event/form-screen';
import { eventQueryOptions } from '@/lib/api/query-options';
import { defaultEvent } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export default function EventEditPage({ eventId }: { eventId: string }) {
  const { data: event } = useQuery({ ...eventQueryOptions(eventId) });

  return <EventFormScreen type="edit" originData={event || defaultEvent} />;
}
