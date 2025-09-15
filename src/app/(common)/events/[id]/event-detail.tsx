'use client';

import { useContext } from 'react';

import BannerList from './_contents/BannerList';
import DesktopContents from './_contents/desktop-contents';
import RecommendedTimesBottomSheet from './_ui/bottom-sheet/RecommendedTimesBottomSheet';
import { BottomButtonsForDesktop } from './_ui/button';
import ParticipantFilter from './_ui/filter/ParticipantFilter';
import TopToolbar from './_ui/toolbar/TopToolbar';
import BarBanner from '@/components/bar-banner';
import GrayBackground from '@/components/gray-background';
import NavBar from '@/components/nav-bar';
import TimeBlockBoard from '@/components/time-block-board/event';
import { BarBannerContext } from '@/contexts/bar-banner';
import { EventParticipantFilterContext } from '@/contexts/event-participant-filter';
import { eventQueryOptions } from '@/lib/api/query-options';
import cn from '@/lib/cn';
import { defaultEvent } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function EventDetailPage() {
  const { isBarBannerShown } = useContext(BarBannerContext);
  const { schedules } = useContext(EventParticipantFilterContext);

  const params = useParams<{ id: string }>();

  const { data: event } = useQuery({ ...eventQueryOptions(params.id) });

  const navBarHeight = 64;
  const headerHeight = 72;
  const participantHeight = schedules.length > 0 ? 36 : 0;
  const barBannerHeight = isBarBannerShown ? 56 : 0;

  const timeBlockTopContentTopPx =
    navBarHeight + headerHeight + participantHeight + barBannerHeight;

  return (
    <div className="flex min-h-[110vh] flex-col">
      <GrayBackground />

      <NavBar variant="gray" className="hidden md:flex" shadow={false} />
      <NavBar variant="black" className="flex md:hidden" shadow={false} />

      <header
        className={cn('flex h-[72px] w-full justify-center', {
          'h-[128px]': isBarBannerShown,
        })}
      >
        <div className="fixed z-30 mx-auto w-full max-w-[calc(768px+2rem)] bg-gray-00 duration-150">
          <TopToolbar />
          <BarBanner
            className="h-[56px]"
            innnerClassName="fixed max-w-[calc(768px+2rem)] w-full"
          />
        </div>
      </header>

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
        <DesktopContents />
      </main>

      <BottomButtonsForDesktop />

      <RecommendedTimesBottomSheet />
    </div>
  );
}
