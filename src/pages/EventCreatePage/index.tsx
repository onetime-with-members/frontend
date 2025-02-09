import { useNavigate } from 'react-router-dom';

import EventFormContent from '@/components/EventFormContent';
import { EventValueType } from '@/types/event.type';
import axios from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

export default function EventCreatePage() {
  const navigate = useNavigate();

  const createEvent = useMutation({
    mutationFn: (value: EventValueType) => {
      return axios.post('/events', value);
    },
    onSuccess: (data) => {
      navigate(`/events/${data.data.payload.event_id}`);
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
