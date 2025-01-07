import { useNavigate } from 'react-router-dom';

import axios from '../../api/axios';
import EventFormContent from '../../components/event-form-content/EventFormContent';
import { EventValue } from '../../types/event.type';
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
