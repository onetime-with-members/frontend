import { useTranslations } from 'next-intl';

import MyEventsSkeleton from './MyEventsSkeleton';
import EmptyUI from '@/components/empty-ui';
import MyEvent from '@/components/event/my-event';
import { useMyEventsQuery } from '@/features/user/api/user.queries';
import cn from '@/lib/cn';

export default function MyEventsContent() {
  const { data: myEvents, isPending: isMyEventsPending } = useMyEventsQuery();

  const t = useTranslations('userDashboard');

  if (isMyEventsPending) {
    return <MyEventsSkeleton />;
  }

  return (
    <div
      className={cn('grid grid-cols-1 gap-4 md:grid-cols-2', {
        'md:grid-cols-1': myEvents && myEvents.length <= 1,
      })}
    >
      {myEvents?.length === 0 ? (
        <div className="rounded-2xl bg-gray-00 py-5">
          <EmptyUI>{t('noEvent')}</EmptyUI>
        </div>
      ) : (
        myEvents?.slice(0, 2).map((myEvent, index) => (
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
