'use client';

import EventFormContent from '@/components/EventFormContent/EventFormContent';
import { EventValueType } from '@/types/event.type';
import axios from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function EventCreatePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createEvent = useMutation({
    mutationFn: (value: EventValueType) => {
      return axios.post('/events', value);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      router.push(`/events/${data.data.payload.event_id}`);
    },
  });

  function handleSubmit(disabled: boolean, value: EventValueType) {
    if (disabled || createEvent.isPending) return;
    createEvent.mutate(value);
  }

  return (
    <EventFormContent
      onSubmit={handleSubmit}
      isPending={createEvent.isPending}
    />
  );
}
