import BannerList from '../BannerList';
import EmptyEventBanner from './EmptyEventBanner';
import RecommendedTimes from './RecommendedTimes';
import { useEventQuery } from '@/features/event/api/events.query';
import { useSchedulesQuery } from '@/features/schedule/api/schedule.query';
import { useParams } from 'next/navigation';

export default function DesktopSideContent() {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);
  const { data: schedules } = useSchedulesQuery(event);

  return (
    <div className="hidden flex-col md:flex md:w-1/2">
      <BannerList className="pt-2" />
      {schedules?.length === 0 ? <EmptyEventBanner /> : <RecommendedTimes />}
    </div>
  );
}
