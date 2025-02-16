import dayjs from 'dayjs';

import cn from '@/utils/cn';
import { timeLabelList } from '@/utils/time-block';

interface LeftTimeLineProps {
  startTime: string;
  endTime: string;
}

export default function LeftTimeLine({
  startTime,
  endTime,
}: LeftTimeLineProps) {
  const timeList = timeLabelList(startTime, endTime);

  function timeFormat(time: string) {
    return time.split(':')[0] === '24'
      ? '24'
      : dayjs(time, 'HH:mm').format('H');
  }

  return (
    <div className="flex w-6 flex-col items-center pr-2">
      {timeList.map((time, index) => (
        <div
          key={time}
          className={cn('flex h-[2rem] items-start justify-end', {
            'opacity-0': index % 2 && index !== timeList.length - 1,
            'h-0': index === timeList.length - 1,
          })}
        >
          <span
            className={cn('text-gray-30 text-sm-200', {
              '-translate-y-1/2': index !== 0,
              '-translate-y-full': index === timeList.length - 1,
            })}
          >
            {timeFormat(time)}
          </span>
        </div>
      ))}
    </div>
  );
}
