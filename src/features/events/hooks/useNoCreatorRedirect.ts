import { useContext, useEffect } from 'react';

import { useEventWithAuthQuery } from '../api/events.query';
import { EventFormContext } from '../contexts/EventFormContext';
import { useParams, useRouter } from 'next/navigation';

export default function useNoCreatorRedirect() {
  const { formStatus } = useContext(EventFormContext);

  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { data: event } = useEventWithAuthQuery({
    id: params.id,
    enabled: formStatus === 'edit',
  });

  useEffect(() => {
    if (!event) return;
    if (event.event_status !== 'CREATOR') {
      router.push(`/events/${params.id}`);
    }
  }, [event]);
}
