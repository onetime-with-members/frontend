'use client';

import { useContext } from 'react';

import { SleepTimeContext } from '@/contexts/sleep-time';
import { WeekdayLocaleContext } from '@/contexts/weekday-locale';
import cn from '@/lib/cn';
import { leftTimeLabelFormat } from '@/lib/utils';

export function DateIndicator({ className }: { className?: string }) {
  const { weekdaysShort } = useContext(WeekdayLocaleContext);

  return (
    <div className={cn('relative', className)}>
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

export function TimeIndicator() {
  const { timesGroupForSplittedTimeLabel } = useContext(SleepTimeContext);

  return (
    <div className="flex w-6 flex-col items-end gap-2 pr-2">
      {timesGroupForSplittedTimeLabel.map((timesGroup, index) => (
        <div key={index}>
          {timesGroup.map((time, index) => (
            <div
              key={index}
              className={cn('h-[6rem] text-right', {
                'h-0': index === timesGroup.length - 1,
              })}
            >
              <span
                className={cn(
                  'block -translate-y-1/2 text-gray-30 text-sm-200',
                  {
                    'translate-y-0': index === 0,
                    '-translate-y-full': index === timesGroup.length - 1,
                  },
                )}
              >
                {leftTimeLabelFormat(time)}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
