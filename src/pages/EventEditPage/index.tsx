import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import EventFormContent from '@/components/EventFormContent';
import { EventType, EventValueType } from '@/types/event.type';
import axios from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function EventEditPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams<{ eventId: string }>();

  const { data, isPending, error } = useQuery<EventType>({
    queryKey: ['events', params.eventId],
    queryFn: async () => {
      const res = await axios.get(`/events/${params.eventId}`);
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
      navigate('/not-found');
    }
  }, [error]);

  useEffect(() => {
    if (!isPending && data && data.event_status !== 'CREATOR') {
      navigate(-1);
    }
  }, [data, isPending]);

  const editEvent = useMutation({
    mutationFn: async (value: EventValueType) => {
      const res = await axios.patch(`/events/${params.eventId}`, value);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate(-1);
    },
  });

  function handleSubmit(disabled: boolean, value: EventValueType) {
    if (disabled || editEvent.isPending) return;
    editEvent.mutate(value);
  }

  return (
    <>
      {data && (
        <Helmet>
          <title>{data.title} 수정 | OneTime</title>
        </Helmet>
      )}
      <EventFormContent
        originData={data}
        onSubmit={handleSubmit}
        isPending={editEvent.isPending}
      />
    </>
  );
}
