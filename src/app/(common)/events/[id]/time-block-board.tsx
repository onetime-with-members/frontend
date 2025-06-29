'use client';

import { useContext } from 'react';

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

export function TimeBlockBoardContent() {
  const { isBarBannerShown } = useContext(BarBannerContext);

  const params = useParams<{ id: string }>();

  const { data: event } = useQuery({ ...eventQueryOptions(params.id) });
  const { data: schedules } = useQuery({
    ...schedulesQueryOptions(event || defaultEvent),
  });

  return (
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
  );
}
