import clsx from 'clsx';

import { getLabelTimeList } from '../../utils/time-block';
import TBDayTopLabel from './TBDayTopLabel';

interface TBLeftLabelLineProps {
  startTime: string;
  endTime: string;
  category: 'DAY' | 'DATE';
}

export default function TBLeftLabelLine({
  startTime,
  endTime,
  category,
}: TBLeftLabelLineProps) {
  const timeList = getLabelTimeList(startTime, endTime);

  return (
    <div className="flex flex-col items-center gap-2">
      <TBDayTopLabel
        category={category}
        timePoint={category === 'DATE' ? '2024.08.20' : '화'}
        className="opacity-0"
      />
      <div className="flex flex-col">
        {timeList.map((time, index) => (
          <div
            key={time}
            className={clsx('flex h-[2rem] items-start', {
              'opacity-0': index % 2 && index !== timeList.length - 1,
            })}
          >
            <span
              className={clsx('text-sm-200 text-gray-30', {
                '-translate-y-1/2': index !== 0,
                '-translate-y-full': index === timeList.length - 1,
              })}
            >
              {time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
