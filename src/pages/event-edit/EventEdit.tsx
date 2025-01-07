import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../../api/axios';
import EventFormContent from '../../components/event-form-content/EventFormContent';
import { EventValue } from '../../types/event.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function EventEdit() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams<{ eventId: string }>();

  const { data, error } = useQuery({
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
