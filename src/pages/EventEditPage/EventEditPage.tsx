import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import EventFormContent from '@/components/EventFormContent/EventFormContent';
import { AppDispatch, RootState } from '@/store';
import { getEvent } from '@/store/eventSlice';
import { EventValueType } from '@/types/event.type';
import axios from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function EventEditPage() {
  const { event, isNotFound } = useSelector((state: RootState) => state.event);
  const dispatch = useDispatch<AppDispatch>();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams<{ eventId: string }>();

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

  useEffect(() => {
    if (params.eventId) {
      dispatch(getEvent(params.eventId));
    }
  }, [params.eventId]);

  useEffect(() => {
    if (isNotFound) {
      navigate('/not-found');
    }
  }, [isNotFound]);

  useEffect(() => {
    if (event.event_status !== 'CREATOR') {
      navigate(-1);
    }
  }, [event]);

  return (
    <EventFormContent onSubmit={handleSubmit} isPending={editEvent.isPending} />
  );
}
