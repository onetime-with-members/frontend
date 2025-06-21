'use client';

import { useContext } from 'react';

import TimeBlockBoard from '@/components/time-block-board/event';
import { BarBannerContext } from '@/contexts/bar-banner';
import cn from '@/lib/cn';
import { EventType, ScheduleType } from '@/lib/types';

export function TimeBlockBoardContent({
  event,
  schedules,
}: {
  event: EventType;
  schedules: ScheduleType[];
}) {
  const { isBarBannerShown } = useContext(BarBannerContext);

  return (
    <div className="w-full md:w-[55%]">
      <TimeBlockBoard
        event={event}
        schedules={schedules}
        backgroundColor="white"
        topContentClassName={cn('top-[123px] bg-gray-05 md:top-[136px]', {
          'top-[179px] md:top-[192px]': isBarBannerShown,
        })}
      />
    </div>
  );
}
