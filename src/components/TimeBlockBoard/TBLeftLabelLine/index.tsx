import clsx from 'clsx';

import { getLabelTimeList } from '../../../utils/time-block';

interface TBLeftLabelLineProps {
  startTime: string;
  endTime: string;
}

export default function TBLeftLabelLine({
  startTime,
  endTime,
}: TBLeftLabelLineProps) {
  const timeList = getLabelTimeList(startTime, endTime);

  return (
    <div className="flex w-[3.5rem] flex-col items-center gap-2 pr-4">
      {timeList.map((time, index) => (
        <div
          key={time}
          className={clsx('flex h-[2rem] items-start justify-end', {
            'opacity-0': index % 2 && index !== timeList.length - 1,
          })}
        >
          <span
            className={clsx('text-gray-30 text-sm-200', {
              '-translate-y-1/2': index !== 0,
              '-translate-y-full': index === timeList.length - 1,
            })}
          >
            {time}
          </span>
        </div>
      ))}
    </div>
  );
}
