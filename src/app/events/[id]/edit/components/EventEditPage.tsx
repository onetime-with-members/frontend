'use client';

import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import EventFormContent from '@/components/EventFormContent/EventFormContent';
import { useRouter } from '@/navigation';
import { useEventQuery } from '@/queries/event.queries';
import { EventValueType } from '@/types/event.type';
import axios from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

export default function EventEditPage() {
  const [isMutating, setIsMutating] = useState(false);

  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const { data, isPending, error } = useEventQuery(params.id);

  useEffect(() => {
    const axiosError = error as AxiosError;

    if (
      axiosError?.response?.status === 404 ||
      axiosError?.response?.status === 400
    ) {
      notFound();
    }
  }, [error, router]);

  useEffect(() => {
    if (!isPending && data && data.event_status !== 'CREATOR') {
      router.back();
    }
  }, [data, isPending, router]);

  const { mutate: editEvent } = useMutation({
    mutationFn: async (value: EventValueType) => {
      const res = await axios.patch(`/events/${params.id}`, value);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      router.back();
    },
    onError: () => {
      setIsMutating(false);
    },
  });

  function handleSubmit(disabled: boolean, value: EventValueType) {
    if (disabled || isMutating) return;
    setIsMutating(true);
    editEvent(value);
  }

  return (
    <EventFormContent
      originData={data}
      onSubmit={handleSubmit}
      isPending={isMutating}
    />
  );
}
