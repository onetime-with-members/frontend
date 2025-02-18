import { useParams } from 'react-router-dom';

import EmptyEventBanner from '../EmptyEventBanner/EmptyEventBanner';
import Participants from './Participants/Participants';
import RecommendedTimes from './RecommendedTimes/RecommendedTimes';
import { useEventQuery } from '@/queries/event.queries';
import { useScheduleQuery } from '@/queries/schedule.queries';

export default function RightContentsForDesktop() {
  const params = useParams<{ eventId: string }>();

  const { data: event } = useEventQuery(params.eventId);
  const { data: schedules } = useScheduleQuery(event);

  return (
    <div className="hidden flex-col gap-10 md:flex md:w-[45%]">
      {schedules &&
        (schedules.length === 0 ? (
          <EmptyEventBanner />
        ) : (
          <>
            <Participants />
            <RecommendedTimes />
          </>
        ))}
    </div>
  );
}
