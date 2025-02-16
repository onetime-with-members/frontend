import useSleepTime from '@/hooks/useSleepTime';
import { SleepTimeType } from '@/types/user.type';
import cn from '@/utils/cn';
import { leftTimeLabelFormat } from '@/utils/time-block';

interface LeftTimeLineProps {
  sleepTime?: SleepTimeType;
}

export default function LeftTimeLine({ sleepTime }: LeftTimeLineProps) {
  const { timesGroupForSplittedTimeBlock } = useSleepTime({
    sleepTime,
  });

  return (
    <div className="flex w-6 flex-col items-end gap-2 pr-2">
      {timesGroupForSplittedTimeBlock('timeLabel').map((timesGroup, index) => (
        <div key={index}>
          {timesGroup.map((time, index) => (
            <div
              key={time}
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
