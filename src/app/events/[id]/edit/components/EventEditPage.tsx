'use client';

import { AxiosError } from 'axios';
import { useEffect } from 'react';

import EventFormContent from '@/components/EventFormContent/EventFormContent';
import { EventType, EventValueType } from '@/types/event.type';
import axios from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

export default function EventEditPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const { data, isPending, error } = useQuery<EventType>({
    queryKey: ['events', params.id],
    queryFn: async () => {
      const res = await axios.get(`/events/${params.id}`);
      return res.data.payload;
    },
    retry: false,
  });

  useEffect(() => {
    const axiosError = error as AxiosError;

    if (
      axiosError?.response?.status === 404 ||
      axiosError?.response?.status === 400
    ) {
      router.push('/not-found');
    }
  }, [error, router]);

  useEffect(() => {
    if (!isPending && data && data.event_status !== 'CREATOR') {
      router.back();
    }
  }, [data, isPending, router]);

  const editEvent = useMutation({
    mutationFn: async (value: EventValueType) => {
      const res = await axios.patch(`/events/${params.id}`, value);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      router.back();
    },
  });

  function handleSubmit(disabled: boolean, value: EventValueType) {
    if (disabled || editEvent.isPending) return;
    editEvent.mutate(value);
  }

  return (
    <EventFormContent
      originData={data}
      onSubmit={handleSubmit}
      isPending={editEvent.isPending}
    />
  );
}
