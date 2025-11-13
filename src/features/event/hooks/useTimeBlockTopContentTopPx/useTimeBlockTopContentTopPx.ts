import { useContext } from 'react';

import { BarBannerContext } from '@/features/banner/contexts/BarBannerContext';
import { EventParticipantFilterContext } from '@/features/event/contexts/EventParticipantFilterContext';

export default function useTimeBlockTopContentTopPx() {
  const { isBarBannerShown } = useContext(BarBannerContext);
  const { schedules } = useContext(EventParticipantFilterContext);

  const navBarHeight = 64;
  const headerHeight = 72;
  const participantHeight = schedules.length > 0 ? 36 : 0;
  const barBannerHeight = isBarBannerShown ? 56 : 0;

  const timeBlockTopContentTopPx =
    navBarHeight + headerHeight + participantHeight + barBannerHeight;

  return timeBlockTopContentTopPx;
}
