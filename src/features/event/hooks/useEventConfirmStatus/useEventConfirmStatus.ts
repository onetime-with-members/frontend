import { useEventQuery, useParticipantsQuery } from '../../api/event.query';
import { useParams } from 'next/navigation';

export default function useEventConfirmStatus():
  | 'confirm'
  | 'available'
  | 'unavailable' {
  const params = useParams<{ id: string }>();

  const { data: event, isPending: isEventPending } = useEventQuery(params.id);
  const { data: participants, isPending: isParticipantsPending } =
    useParticipantsQuery(params.id);

  if (isEventPending || isParticipantsPending) return 'unavailable';

  return event.event_status === 'CONFIRMED'
    ? 'confirm'
    : participants.length >= 2
      ? 'available'
      : 'unavailable';
}
