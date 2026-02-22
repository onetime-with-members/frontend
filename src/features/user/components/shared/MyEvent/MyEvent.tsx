'use client';

import EventContent from './EventContent';
import TimeSummary from './TimeSummary/TimeSummary';
import { SKELETON_GRAY } from '@/constants';
import { MyEventType } from '@/features/user/types';
import cn from '@/lib/cn';
import { ProgressLink } from '@/navigation';

export default function MyEvent({
  event,
  className,
  isPending = false,
}: {
  event: MyEventType;
  className?: string;
  isPending?: boolean;
}) {
  return (
    <ProgressLink
      href={`/events/view/${event.event_id}`}
      className={cn(
        'flex flex-col gap-3 rounded-2xl border border-gray-10 bg-gray-00 p-5',
        className,
      )}
      style={{
        ...(isPending && { backgroundColor: SKELETON_GRAY }),
      }}
      {...(!isPending && { 'data-testid': 'my-event' })}
    >
      <EventContent event={event} isPending={isPending} />
      <TimeSummary event={event} isPending={isPending} />
    </ProgressLink>
  );
}
