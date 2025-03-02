import cn from '@/utils/cn';
import { leftTimeLabelFormat, timeLabelList } from '@/utils/time-block';

interface LeftTimeLineProps {
  startTime: string;
  endTime: string;
}

export default function LeftTimeLine({
  startTime,
  endTime,
}: LeftTimeLineProps) {
  const timeList = timeLabelList(startTime, endTime);

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
            {leftTimeLabelFormat(time)}
          </span>
        </div>
      ))}
    </div>
  );
}
