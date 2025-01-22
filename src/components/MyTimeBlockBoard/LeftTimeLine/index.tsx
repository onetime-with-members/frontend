import dayjs from 'dayjs';

import cn from '@/utils/cn';
import { getLabelTimeList } from '@/utils/time-block';

export default function LeftTimeLine() {
  const labelTimeList = getLabelTimeList('00:00', '24:00', '1h');

  return (
    <div className="flex w-[2.5rem] flex-col items-end pr-2">
      {labelTimeList.map((time, index) => (
        <div
          key={time}
          className={cn('h-[6rem] text-right', {
            'h-0': index === labelTimeList.length - 1,
          })}
        >
          <span
            className={cn('block -translate-y-1/2 text-gray-30 text-sm-200', {
              'translate-y-0': index === 0,
              '-translate-y-full': index === labelTimeList.length - 1,
            })}
          >
            {time === '24:00' ? '24시' : dayjs(time, 'HH:mm').format('H시')}
          </span>
        </div>
      ))}
    </div>
  );
}
