import { useContext } from 'react';

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

  const navBar = 64;
  const eventHeader = isMobile ? 112 : 64;
  const participantFilter = schedules.length > 0 ? 36 : 0;
  const barBanner = isBarBannerShown ? 56 : 0;

  return callback({
    navBar,
    eventHeader,
    participantFilter,
    barBanner,
  });
}
