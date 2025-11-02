import { useContext } from 'react';

import { ScheduleFormContext } from '../../../contexts/ScheduleFormContext';
import MemberLoginSubScreen from './MemberLoginSubScreen';
import ScheduleFormSubScreen from './ScheduleFormSubScreen';
import { useEventQuery } from '@/features/event/api/event.query';
import cn from '@/lib/cn';
import { useParams } from 'next/navigation';

export default function MainContent() {
  const { pageIndex } = useContext(ScheduleFormContext);

  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  return (
    <main
      className={cn(
        'mx-auto flex flex-col bg-gray-00 px-6 sm:h-auto sm:max-w-[480px] sm:gap-14 sm:rounded-3xl sm:px-9',
        {
          'py-4 sm:py-10': pageIndex === 0,
          'pb-16 sm:mb-28 sm:py-6': pageIndex === 1,
        },
      )}
    >
      {pageIndex === 0 && <MemberLoginSubScreen />}
      {pageIndex === 1 && event && <ScheduleFormSubScreen />}
    </main>
  );
}
