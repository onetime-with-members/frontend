import { useContext } from 'react';

import { useEventQuery } from '@/features/event/api/event.query';
import { BarBannerContext } from '@/features/banner/contexts/BarBannerContext';
import { EventParticipantFilterContext } from '@/features/event/contexts/EventParticipantFilterContext';
import { ResponsiveTopContentHeight } from '@/features/event/types';
import { useParams } from 'next/navigation';

export default function useTopContentHeight(
  callback: (heights: {
    navBar: number;
    eventHeader: number;
    participantFilter: number;
    barBanner: number;
    dashboardHeader: number;
  }) => number,
): ResponsiveTopContentHeight {
  const { isBarBannerShown } = useContext(BarBannerContext);
  const { schedules } = useContext(EventParticipantFilterContext);

  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id, { enabled: !!params.id });

  const navBar = 56;
  const participantFilter = schedules.length > 0 ? 36 : 0;
  const barBanner = isBarBannerShown ? 56 : 0;

  const eventConfirmBanner = event.event_status !== 'CONFIRMED' ? 48 : 0;
  const eventHeaderGap = event.event_status !== 'CONFIRMED' ? 12 : 0;

  const build = (isMobile: boolean) =>
    callback({
      navBar,
      eventHeader: isMobile ? 52 + eventHeaderGap + eventConfirmBanner : 56,
      participantFilter,
      barBanner,
      dashboardHeader: isMobile ? 0 : 72,
    });

  return { mobile: build(true), desktop: build(false) };
}
