import { useContext } from 'react';

import ConfirmedTime from '../shared/ConfirmedTime';
import BannerList from './BannerList';
import DesktopSideContent from './DesktopSideContent';
import ParticipantFilter from './ParticipantFilter';
import AdSenseUnit from '@/components/AdSenseUnit';
import { ADSENSE_SLOTS } from '@/constants';
import { useEventQuery } from '@/features/event/api/event.query';
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
          slot={ADSENSE_SLOTS.eventDetail.mobileHorizontal}
          device="mobile"
          fixedSize={{ width: 320, height: 100 }}
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
          slot={ADSENSE_SLOTS.eventDetail.mobileRectangle}
          device="mobile"
          className="mt-4 md:hidden"
        />
      </div>
      <DesktopSideContent />
    </main>
  );
}
