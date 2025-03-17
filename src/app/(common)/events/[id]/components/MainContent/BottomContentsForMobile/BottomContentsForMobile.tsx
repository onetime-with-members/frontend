import BannerList from '../BannerList/BannerList';
import EmptyEventBanner from '../EmptyEventBanner/EmptyEventBanner';
import { useEventQuery } from '@/queries/event.queries';
import { useScheduleQuery } from '@/queries/schedule.queries';
import { useParams } from 'next/navigation';

export default function BottomContentsForMobile() {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);
  const { data: schedules } = useScheduleQuery(event);

  return (
    <div className="block md:hidden">
      {schedules &&
        (schedules.length === 0 ? <EmptyEventBanner /> : <BannerList />)}
    </div>
  );
}
