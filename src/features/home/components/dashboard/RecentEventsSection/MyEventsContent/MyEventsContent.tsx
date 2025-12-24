'use client';

import { useTranslations } from 'next-intl';

import EmptyUI from './EmptyUI';
import MyEventsSkeleton from './MyEventsSkeleton';
import { useRecentMyEventListQuery } from '@/features/user/api/user.query';
import MyEvent from '@/features/user/components/shared/MyEvent';
import cn from '@/lib/cn';

export default function MyEventsContent() {
  const { data: myEventList, isPending } = useRecentMyEventListQuery();

  const t = useTranslations('userDashboard');

  if (isPending) {
    return <MyEventsSkeleton />;
  }

  return (
    <div
      className={cn('grid grid-cols-1 gap-4 md:grid-cols-2', {
        'md:grid-cols-1': myEventList.length <= 1,
      })}
    >
      {myEventList.length === 0 ? (
        <div className="rounded-2xl bg-gray-00 py-5">
          <EmptyUI>{t('noEvent')}</EmptyUI>
        </div>
      ) : (
        myEventList.map((myEvent, index) => (
          <MyEvent
            key={myEvent.event_id}
            event={myEvent}
            className={cn('border-none', {
              'hidden md:flex': index === 1,
            })}
          />
        ))
      )}
    </div>
  );
}
