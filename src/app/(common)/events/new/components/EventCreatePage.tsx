'use client';

import { useState } from 'react';

import EventFormContent from '@/components/form-control/EventFormContent/EventFormContent';
import { EventValueType } from '@/lib/types';
import { useRouter } from '@/navigation';
import axios from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function EventCreatePage() {
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: createEvent } = useMutation({
    mutationFn: async (value: EventValueType) => {
      const res = await axios.post('/events', value);
      return res.data.payload;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      router.push(`/events/${data.event_id}`);
    },
    onError: () => {
      setIsMutating(false);
    },
  });

  function handleSubmit(disabled: boolean, value: EventValueType) {
    if (disabled || isMutating) return;
    setIsMutating(true);
    createEvent(value);
  }

  return <EventFormContent onSubmit={handleSubmit} isPending={isMutating} />;
}
