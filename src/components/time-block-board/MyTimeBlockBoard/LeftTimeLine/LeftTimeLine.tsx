import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import cn from '@/utils/cn';

export default function LeftTimeLine() {
  const { timeLabelGroup } = useSelector((state: RootState) => state.sleepTime);

  return (
    <div className="flex w-[2.5rem] flex-col items-end gap-2 pr-2">
      {timeLabelGroup.map((timesGroup, index) => (
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
                {time === '24:00' ? '24시' : dayjs(time, 'HH:mm').format('H시')}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
