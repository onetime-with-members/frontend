import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import EventFormContent from '../../components/event-form-content/EventFormContent';
import { EventType, EventValue } from '../../types/event.type';
import axios from '../../utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function EventEdit() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams<{ eventId: string }>();

  const { data, isPending, error } = useQuery<EventType>({
    queryKey: ['events', params.eventId, '_'],
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
    mutationFn: async (value: EventValue) => {
      const res = await axios.patch(`/events/${params.eventId}`, value);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate(-1);
    },
  });

  function handleSubmit(disabled: boolean, value: EventValue) {
    if (disabled) return;
    editEvent.mutate(value);
  }

  return <EventFormContent originData={data} onSubmit={handleSubmit} />;
}
