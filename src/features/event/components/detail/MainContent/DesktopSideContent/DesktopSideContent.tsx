import ConfirmedTime from '../../shared/ConfirmedTime';
import BannerList from '../BannerList';
import EmptyEventBanner from './EmptyEventBanner';
import {
  RecommendedTimesHeading,
  RecommendedTimesList,
} from './RecommendedTimes';
import { useEventQuery } from '@/features/event/api/event.query';
import { useSchedulesQuery } from '@/features/schedule/api/schedule.query';
import { useParams } from 'next/navigation';

export default function DesktopSideContent() {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);
  const { data: schedules, isPending: isSchedulesPending } =
    useSchedulesQuery(event);

  return (
    <div className="hidden flex-col md:flex md:w-1/2">
      {event.event_status === 'CONFIRMED' && <ConfirmedTime />}
      {!isSchedulesPending && schedules.length === 0 ? (
        <>
          <BannerList className="pt-2" />
          <EmptyEventBanner />
        </>
      ) : (
        <>
          <RecommendedTimesHeading />
          <BannerList className="pt-2" />
          <RecommendedTimesList />
        </>
      )}
    </div>
  );
}
