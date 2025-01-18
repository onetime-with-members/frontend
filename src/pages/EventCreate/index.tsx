import { useNavigate } from 'react-router-dom';

import EventFormContent from '@/components/event-form-content/EventFormContent';
import { EventValue } from '@/types/event.type';
import axios from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

export default function EventCreate() {
  const navigate = useNavigate();

  const createEvent = useMutation({
    mutationFn: (value: EventValue) => {
      return axios.post('/events', value);
    },
    onSuccess: (data) => {
      navigate(`/events/${data.data.payload.event_id}`);
    },
  });

  function handleSubmit(disabled: boolean, value: EventValue) {
    if (disabled) return;

    createEvent.mutate(value);
  }

  return <EventFormContent onSubmit={handleSubmit} />;
}
