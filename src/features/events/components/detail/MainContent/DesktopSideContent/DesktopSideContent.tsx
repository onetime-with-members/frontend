import BannerList from '../BannerList';
import EmptyEventBanner from './EmptyEventBanner';
import RecommendedTimes from './RecommendedTimes';
import { useEventQuery } from '@/features/events/api';
import { schedulesQueryOptions } from '@/lib/api/query-options';
import { defaultEvent } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function DesktopSideContent() {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);
  const { data: schedules } = useQuery({
    ...schedulesQueryOptions(event || defaultEvent),
  });

  return (
    <div className="hidden flex-col md:flex md:w-1/2">
      <BannerList className="pt-2" />
      {schedules?.length === 0 ? <EmptyEventBanner /> : <RecommendedTimes />}
    </div>
  );
}
