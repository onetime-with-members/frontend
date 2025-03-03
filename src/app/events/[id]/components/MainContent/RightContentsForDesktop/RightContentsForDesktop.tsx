import EmptyEventBanner from '../EmptyEventBanner/EmptyEventBanner';
import Participants from './Participants/Participants';
import RecommendedTimes from './RecommendedTimes/RecommendedTimes';
import { useEventQuery } from '@/queries/event.queries';
import { useScheduleQuery } from '@/queries/schedule.queries';
import { useParams } from 'next/navigation';

export default function RightContentsForDesktop() {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);
  const { data: schedules } = useScheduleQuery(event);

  return (
    <div className="hidden flex-col md:flex md:w-[45%]">
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
