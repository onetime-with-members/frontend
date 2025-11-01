import { useContext } from 'react';

import TopDateLabel from './TopDateLabel';
import { TimeBlockBoardContext } from '@/features/schedule/contexts/TimeBlockBoardContext';
import cn from '@/lib/cn';
import dayjs from '@/lib/dayjs';

export default function DateIndicator() {
  const { event, topLabelRef } = useContext(TimeBlockBoardContext);

  return (
    <div className="pl-6">
      <div
        ref={topLabelRef}
        className="scrollbar-hidden flex flex-1 items-center gap-2 overflow-x-hidden"
      >
        {event?.ranges.map((timePoint, index) => (
          <TopDateLabel
            key={timePoint}
            category={event.category}
            timePoint={timePoint}
            className={cn('min-w-[52px] flex-1 py-2 text-center', {
              'mr-2':
                event.category === 'DATE' &&
                !dayjs(event.ranges[index], 'YYYY.MM.DD')
                  .add(1, 'day')
                  .isSame(dayjs(event.ranges[index + 1], 'YYYY.MM.DD')),
            })}
          />
        ))}
      </div>
    </div>
  );
}
