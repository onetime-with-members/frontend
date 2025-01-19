import clsx from 'clsx';
import dayjs from 'dayjs';

import { getLabelTimeList } from '@/utils/time-block';

export default function LeftTimeLine() {
  const labelTimeList = getLabelTimeList('00:00', '24:00', '1h');

  return (
    <div className="flex w-[2rem] flex-col items-start">
      {labelTimeList.map((time, index) => (
        <div
          key={time}
          className={clsx('h-[6rem] text-center', {
            'h-0': index === labelTimeList.length - 1,
          })}
        >
          <span
            className={clsx('block -translate-y-1/2 text-gray-30 text-sm-200', {
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
