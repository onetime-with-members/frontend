import { useParams } from 'react-router-dom';

import BannerList from '../BannerList/BannerList';
import EmptyEventBanner from '../EmptyEventBanner/EmptyEventBanner';
import { useEventQuery } from '@/queries/event.queries';
import { useScheduleQuery } from '@/queries/schedule.queries';

export default function BottomContentsForMobile() {
  const params = useParams<{ eventId: string }>();

  const { data: event } = useEventQuery(params.eventId);
  const { data: schedules } = useScheduleQuery(event);

  return (
    <div className="block md:hidden">
      {schedules &&
        (schedules.length === 0 ? <EmptyEventBanner /> : <BannerList />)}
    </div>
  );
}
