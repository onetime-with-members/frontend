import { useEventQuery, useParticipantsQuery } from '../../api/event.query';
import { useParams } from 'next/navigation';

export default function useEventConfirmStatus() {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);
  const { data: participants } = useParticipantsQuery(params.id);

  // const isConfirmed = event.event_status === 'CONFIRMED';
  // const isConfirmAvailable =
  //   participants.length >= 2 && event.event_status === 'ACTIVE';
  // const isConfirmUnavailable =
  //   participants.length < 2 && event.event_status === 'ACTIVE';

  return event.event_status === 'CONFIRMED'
    ? 'confirm'
    : participants.length >= 2
      ? 'available'
      : 'unavailable';
}
