'use client';

import { useContext } from 'react';

import DesktopContents from './_contents/desktop-contents';
import MobileContents from './_contents/mobile-contents';
import { BottomButtons, ToolbarButtons } from './_ui/button';
import BarBanner from '@/components/bar-banner';
import NavBar from '@/components/nav-bar';
import TimeBlockBoard from '@/components/time-block-board/event';
import { BarBannerContext } from '@/contexts/bar-banner';
import {
  eventQueryOptions,
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
  const { data: schedules } = useQuery({
    ...schedulesQueryOptions(event || defaultEvent),
  });

  return (
    <div className="flex min-h-[110vh] flex-col">
      {/* Navigation Bar */}
      <NavBar variant="default" className="hidden md:flex" />
      <NavBar variant="black" className="flex md:hidden" shadow={false} />

      {/* Top Toolbar and Bar Banner */}
      <header
        className={cn('flex h-[59px] w-full justify-center md:h-[72px]', {
          'h-[115px] md:h-[128px]': isBarBannerShown,
        })}
      >
        <div className="fixed z-30 mx-auto w-full max-w-[calc(768px+2rem)] bg-gray-00 duration-150">
          {/* Top Toolbar */}
          <div className="bg-gray-80 px-6 py-4 md:rounded-t-3xl">
            <div className="flex items-center justify-between md:h-10">
              <h1 className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-00 text-lg-300 md:title-sm-300">
                {event?.title}
              </h1>
              <ToolbarButtons />
            </div>
          </div>
          {/* Bar Banner */}
          <BarBanner
            className="h-[56px]"
            innnerClassName="fixed max-w-[calc(768px+2rem)] w-full"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-[calc(768px+2rem)] flex-col gap-6 bg-gray-05 px-4 pb-16 pt-6 md:px-6">
        <div className="flex gap-6">
          {/* Time Block Board */}
          <div className="w-full md:w-[55%]">
            <TimeBlockBoard
              event={event || defaultEvent}
              schedules={schedules || []}
              backgroundColor="white"
              topContentClassName={cn('top-[123px] bg-gray-05 md:top-[136px]', {
                'top-[179px] md:top-[192px]': isBarBannerShown,
              })}
            />
          </div>
          {/* Right Contents for Desktop */}
          <DesktopContents />
        </div>
        {/* Bottom Contents for Mobile */}
        <MobileContents />
      </main>

      {/* Bottom Button for Desktop and Mobile */}
      <BottomButtons />
    </div>
  );
}
