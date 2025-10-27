import { useContext } from 'react';

import BannerList from './BannerList';
import DesktopSideContent from './DesktopSideContent';
import ParticipantFilter from './ParticipantFilter';
import TimeBlockBoard from '@/components/time-block-board/event';
import { EventParticipantFilterContext } from '@/contexts/event-participant-filter';
import { useEventQuery } from '@/features/event/api/events.query';
import useTimeBlockTopContentTopPx from '@/features/event/hooks/useTimeBlockTopContentTopPx';
import { defaultEvent } from '@/lib/constants';
import { useParams } from 'next/navigation';

export default function MainContent() {
  const { schedules } = useContext(EventParticipantFilterContext);

  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  const timeBlockTopContentTopPx = useTimeBlockTopContentTopPx();

  return (
    <main className="mx-auto flex w-full max-w-[calc(768px+2rem)] gap-6 bg-gray-00 px-4 pb-16 pt-2 md:px-6">
      <div className="w-full md:w-1/2">
        <BannerList className="md:hidden" />
        <ParticipantFilter />
        <TimeBlockBoard
          event={event || defaultEvent}
          schedules={schedules || []}
          backgroundColor="gray"
          topContentStyle={{
            top: timeBlockTopContentTopPx,
          }}
        />
      </div>
      <DesktopSideContent />
    </main>
  );
}
