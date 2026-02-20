import { useEventQuery, useParticipantsQuery } from '../../api/event.query';
import { useParams } from 'next/navigation';

export default function useEventConfirmStatus() {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);
  const { data: participants } = useParticipantsQuery(params.id);

  return event.event_status === 'CONFIRMED'
    ? 'confirm'
    : participants.length >= 2
      ? 'available'
      : 'unavailable';
}
