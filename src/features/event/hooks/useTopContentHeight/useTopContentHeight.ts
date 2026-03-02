import { useContext } from 'react';

import { useEventQuery } from '../../api/event.query';
import { BarBannerContext } from '@/features/banner/contexts/BarBannerContext';
import { EventParticipantFilterContext } from '@/features/event/contexts/EventParticipantFilterContext';
import useIsMobile from '@/hooks/useIsMobile';
import { useParams } from 'next/navigation';

export default function useTopContentHeight(
  callback: (heights: {
    navBar: number;
    eventHeader: number;
    participantFilter: number;
    barBanner: number;
  }) => number,
) {
  const { isBarBannerShown } = useContext(BarBannerContext);
  const { schedules } = useContext(EventParticipantFilterContext);

  const params = useParams<{ id: string }>();

  const isMobile = useIsMobile();

  const { data: event } = useEventQuery(params.id);

  const navBar = 64;
  const participantFilter = schedules.length > 0 ? 36 : 0;
  const barBanner = isBarBannerShown ? 56 : 0;

  const eventConfirmBanner = isMobile
    ? event.event_status === 'CONFIRMED'
      ? 124
      : 48
    : 0;
  const eventHeaderGap =
    isMobile || event.event_status === 'CONFIRMED' ? 12 : 0;
  const eventHeader = isMobile ? 60 + eventHeaderGap + eventConfirmBanner : 64;

  return callback({
    navBar,
    eventHeader,
    participantFilter,
    barBanner,
  });
}
