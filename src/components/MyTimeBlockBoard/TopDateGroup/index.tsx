import clsx from 'clsx';
import dayjs from 'dayjs';
import { useContext } from 'react';

import OverlayCover from './OverlayCover';
import { MyScheduleContext } from '@/contexts/MyScheduleContext';

interface TopDateGroupProps {
  className?: string;
}

export default function TopDateGroup({ className }: TopDateGroupProps) {
  const { selectedTimeBlockId } = useContext(MyScheduleContext);

  return (
    <div className={clsx('relative', className)}>
      <div className="grid grid-cols-7 gap-2 pl-[2rem]">
        {dayjs.weekdaysMin().map((weekday) => (
          <div
            key={weekday}
            className="py-2 text-center text-gray-30 text-md-200"
          >
            {weekday}
          </div>
        ))}
      </div>
      {selectedTimeBlockId !== null && <OverlayCover />}
    </div>
  );
}
