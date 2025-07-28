'use client';

import { useContext } from 'react';

import DesktopContents from './_contents/desktop-contents';
import RecommededTimesBottomSheet from './_ui/bottom-sheet/RecommededTimesBottomSheet';
import { BottomButtonsForDesktop } from './_ui/button';
import ParticipantFilter from './_ui/filter/ParticipantFilter';
import TopToolbar from './_ui/top-toolbar';
import BarBanner from '@/components/bar-banner';
import GrayBackground from '@/components/gray-background';
import NavBar from '@/components/nav-bar';
import TimeBlockBoard from '@/components/time-block-board/event';
import { BarBannerContext } from '@/contexts/bar-banner';
import {
  eventQueryOptions,
  filteredSchedulesQueryOptions,
  schedulesQueryOptions,
} from '@/lib/api/query-options';
import cn from '@/lib/cn';
import { defaultEvent } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function EventDetailPage() {
  const { isBarBannerShown } = useContext(BarBannerContext);

  const params = useParams<{ id: string }>();

  const { data: event } = useQuery({ ...eventQueryOptions(params.id) });
  const { data: schedulesData } = useQuery({
    ...schedulesQueryOptions(event || defaultEvent),
  });
  const { data: filteredSchedulesData } = useQuery({
    ...filteredSchedulesQueryOptions({
      eventId: params.id,
      category: event?.category || 'DATE',
    }),
  });
  const schedules =
    filteredSchedulesData && filteredSchedulesData.length > 0
      ? filteredSchedulesData
      : schedulesData;

  const navBarHeight = 64;
  const headerHeight = 72;
  const participantHeight = schedules && schedules.length > 0 ? 39 : 0;
  const barBannerHeight = isBarBannerShown ? 56 : 0;

  return (
    <div className="flex min-h-[110vh] flex-col">
      <GrayBackground />

      <NavBar variant="default" className="hidden md:flex" />
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
          <ParticipantFilter />
          <TimeBlockBoard
            event={event || defaultEvent}
            schedules={schedules || []}
            backgroundColor="gray"
            topContentClassName={cn('top-[136px] bg-gray-00 md:top-[136px]', {
              'top-[214px] md:top-[227px]': isBarBannerShown,
            })}
            topContentStyle={{
              top:
                navBarHeight +
                headerHeight +
                participantHeight +
                barBannerHeight,
            }}
          />
        </div>
        <DesktopContents />
      </main>

      <BottomButtonsForDesktop />

      <RecommededTimesBottomSheet />
    </div>
  );
}
