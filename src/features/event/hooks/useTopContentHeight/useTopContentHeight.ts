import { useContext } from 'react';

import useEventConfirmStatus from '../useEventConfirmStatus';
import { BarBannerContext } from '@/features/banner/contexts/BarBannerContext';
import { EventParticipantFilterContext } from '@/features/event/contexts/EventParticipantFilterContext';
import useIsMobile from '@/hooks/useIsMobile';

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

  const isMobile = useIsMobile();
  const eventConfirmStatus = useEventConfirmStatus();

  const navBar = 64;
  const participantFilter = schedules.length > 0 ? 36 : 0;
  const barBanner = isBarBannerShown ? 56 : 0;

  const eventConfirmBanner = isMobile
    ? eventConfirmStatus === 'confirm'
      ? 124
      : eventConfirmStatus === 'available'
        ? 48
        : 0
    : 0;
  const eventHeaderGap = eventConfirmStatus !== 'unavailable' ? 12 : 0;
  const eventHeader = isMobile ? 52 + eventHeaderGap + eventConfirmBanner : 64;

  console.log(eventConfirmBanner);
  console.log(eventHeader);

  return callback({
    navBar,
    eventHeader,
    participantFilter,
    barBanner,
  });
}
