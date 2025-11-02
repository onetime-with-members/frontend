import { useContext } from 'react';

import { WeekdayLocaleContext } from '@/contexts/WeekdayLocaleContext';
import { MyTimeBlockBoardContext } from '@/features/my-schedule/contexts/MyTimeBlockBoardContext';
import cn from '@/lib/cn';

export default function DateIndicator() {
  const { topDateGroupClassName } = useContext(MyTimeBlockBoardContext);
  const { weekdaysShort } = useContext(WeekdayLocaleContext);

  return (
    <div className={cn('relative', topDateGroupClassName)}>
      <div className="grid grid-cols-7 gap-2 pl-6">
        {weekdaysShort.map((weekday) => (
          <div
            key={weekday}
            className="py-2 text-center text-gray-30 text-md-200"
          >
            {weekday}
          </div>
        ))}
      </div>
    </div>
  );
}
