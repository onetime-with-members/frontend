import { useEffect, useState } from 'react';

import { useEventQuery } from '../../api/events.query';
import useGuestEditedEvents from './useGuestEditedEvents';
import { useScheduleDetailQuery } from '@/features/schedule/api/schedule.query';
import { useAuth } from '@/lib/auth';
import { useParams } from 'next/navigation';

export default function useIsEventEdited() {
  const [isEdited, setIsEdited] = useState(false);

  const params = useParams<{ id: string }>();

  const { isLoggedIn } = useAuth();

  const { data: event } = useEventQuery(params.id);
  const { data: scheduleDetail } = useScheduleDetailQuery({
    event,
    isLoggedIn,
  });

  const { isGuestEditedEvent } = useGuestEditedEvents();

  useEffect(() => {
    async function getIsEventEdited() {
      setIsEdited(
        isLoggedIn
          ? scheduleDetail.schedules.length !== 0 &&
              scheduleDetail.schedules.every(
                (schedule) => schedule.times.length !== 0,
              )
          : await isGuestEditedEvent(params.id),
      );
    }
    getIsEventEdited();
  }, [isLoggedIn, scheduleDetail, isGuestEditedEvent, params]);

  return isEdited;
}
