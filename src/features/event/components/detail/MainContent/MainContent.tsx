import { useContext } from 'react';

import ConfirmedTime from '../shared/ConfirmedTime';
import BannerList from './BannerList';
import DesktopSideContent from './DesktopSideContent';
import ParticipantFilter from './ParticipantFilter';
import AdSenseUnit from '@/components/AdSenseUnit';
import { useEventQuery } from '@/features/event/api/event.query';
import { EVENT_DETAIL_ADSENSE_SLOT } from '@/features/event/constants';
import { EventParticipantFilterContext } from '@/features/event/contexts/EventParticipantFilterContext';
import useTopContentHeight from '@/features/event/hooks/useTopContentHeight';
import TimeBlockBoard from '@/features/schedule/components/shared/TimeBlockBoard';
import { useParams } from 'next/navigation';

export default function MainContent() {
  const { schedules } = useContext(EventParticipantFilterContext);

  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  const stickyTop = useTopContentHeight(
    ({ navBar, eventHeader, participantFilter, barBanner }) =>
      navBar + eventHeader + participantFilter + barBanner,
  );

  return (
    <main className="mx-auto flex w-full max-w-[calc(768px+2rem)] gap-6 bg-gray-00 p-4 pb-16">
      <div className="w-full md:w-1/2">
        {event.event_status === 'CONFIRMED' && (
          <div className="mb-3 md:hidden">
            <ConfirmedTime />
          </div>
        )}
        <BannerList className="md:hidden" />
        <AdSenseUnit
          slot={EVENT_DETAIL_ADSENSE_SLOT}
          format="horizontal"
          className="mt-3 md:hidden"
        />
        <ParticipantFilter />
        <TimeBlockBoard
          event={event}
          schedules={schedules || []}
          backgroundColor="gray"
          topContentStyle={{
            top: stickyTop,
          }}
        />
        <AdSenseUnit
          slot={EVENT_DETAIL_ADSENSE_SLOT}
          format="rectangle"
          className="mt-4 md:hidden"
        />
      </div>
      <DesktopSideContent />
    </main>
  );
}
