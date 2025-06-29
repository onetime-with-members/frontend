'use client';

import { useContext } from 'react';

import TimeBlockBoard from '@/components/time-block-board/event';
import { BarBannerContext } from '@/contexts/bar-banner';
import { schedulesQueryOptions } from '@/lib/api/query-options';
import cn from '@/lib/cn';
import { EventType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export function TimeBlockBoardContent({ event }: { event: EventType }) {
  const { isBarBannerShown } = useContext(BarBannerContext);

  const { data: schedules } = useQuery({ ...schedulesQueryOptions(event) });

  return (
    <div className="w-full md:w-[55%]">
      <TimeBlockBoard
        event={event}
        schedules={schedules || []}
        backgroundColor="white"
        topContentClassName={cn('top-[123px] bg-gray-05 md:top-[136px]', {
          'top-[179px] md:top-[192px]': isBarBannerShown,
        })}
      />
    </div>
  );
}
