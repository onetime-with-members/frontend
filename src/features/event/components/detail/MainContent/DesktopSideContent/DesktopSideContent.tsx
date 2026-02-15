import BannerList from '../BannerList';
import EmptyEventBanner from './EmptyEventBanner';
import RecommendedTimes from './RecommendedTimes';
import { useEventQuery } from '@/features/event/api/event.query';
import { useSchedulesQuery } from '@/features/schedule/api/schedule.query';
import { useParams } from 'next/navigation';
import Schedule from './Schedule';

export default function DesktopSideContent() {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);
  const { data: schedules, isPending: isSchedulesPending } =
    useSchedulesQuery(event);

  return (
    <div className="hidden flex-col md:flex md:w-1/2">
      <Schedule />
      <BannerList className="pt-2" />
      {!isSchedulesPending && schedules.length === 0 ? (
        <EmptyEventBanner />
      ) : (
        <RecommendedTimes />
      )}
    </div>
  );
}
