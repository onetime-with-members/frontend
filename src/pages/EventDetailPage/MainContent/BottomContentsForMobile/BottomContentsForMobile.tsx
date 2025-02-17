import { useParams } from 'react-router-dom';

import BannerList from '../BannerList/BannerList';
import EmptyEventBanner from '../EmptyEventBanner/EmptyEventBanner';
import { useEventQuery, useRecommendTimesQuery } from '@/queries/event.queries';
import { useScheduleQuery } from '@/queries/schedule.queries';

export default function BottomContentsForMobile() {
  const params = useParams<{ eventId: string }>();

  const { data: event } = useEventQuery(params.eventId);
  const { data: schedules } = useScheduleQuery(event);
  const { data: recommendTimes } = useRecommendTimesQuery(params.eventId);

  function copyEventShareLink() {
    if (!event) return;
    navigator.clipboard.writeText(
      `${window.location.origin}/events/${event.event_id}`,
    );
  }

  return (
    <div className="block md:hidden">
      {schedules &&
        (schedules.length === 0 ? (
          <EmptyEventBanner copyEventShareLink={copyEventShareLink} />
        ) : (
          <BannerList
            eventCategory={event?.category || 'DATE'}
            recommendSchedules={recommendTimes || []}
          />
        ))}
    </div>
  );
}
