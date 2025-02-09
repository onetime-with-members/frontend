import dayjs from 'dayjs';
import { useContext } from 'react';

import OverlayCover from '@/components/overlay/OverlayCover';
import { MyScheduleContext } from '@/contexts/MyScheduleContext';
import cn from '@/utils/cn';
import { weekdaysShortLowerEn } from '@/utils/weekday';

interface WeekdaySelectProps {
  weekdayRefs: React.RefObject<(HTMLDivElement | null)[]>;
  activeWeekday: string;
}

export default function WeekdaySelect({
  weekdayRefs,
  activeWeekday,
}: WeekdaySelectProps) {
  const { selectedTimeBlockId } = useContext(MyScheduleContext);

  function handleWeekdayButtonClick(
    weekday: (typeof weekdaysShortLowerEn)[number],
  ) {
    const weekdayRef = weekdayRefs.current
      ? weekdayRefs.current[weekdaysShortLowerEn.indexOf(weekday)]
      : null;

    if (weekdayRef) {
      weekdayRef.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="sticky top-[64px] z-20 w-full bg-gray-00 md:top-[122px]">
      <div
        className={cn(
          'relative flex w-full justify-center px-4 py-2 md:z-30 md:w-full md:px-0',
          {
            'z-[101]': selectedTimeBlockId,
          },
        )}
      >
        <div className="flex w-full max-w-screen-sm items-center justify-between">
          {weekdaysShortLowerEn.map((weekday) => (
            <button
              onClick={() => handleWeekdayButtonClick(weekday)}
              key={weekday}
              className={cn(
                'flex h-10 w-10 items-center justify-center text-gray-40 text-md-200',
                {
                  'rounded-full bg-primary-00 text-primary-60 text-md-300':
                    activeWeekday === weekday,
                },
              )}
            >
              {dayjs.weekdaysShort()[weekdaysShortLowerEn.indexOf(weekday)]}
            </button>
          ))}
        </div>
        {selectedTimeBlockId !== null && <OverlayCover />}
      </div>
    </div>
  );
}
