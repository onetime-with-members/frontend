import { useLocale } from 'next-intl';

import cn from '@/lib/cn';
import { weekdaysShortKo } from '@/lib/constants';
import dayjs from '@/lib/dayjs';
import { EventType } from '@/lib/types';
import { leftTimeLabelFormat, timeLabelList } from '@/lib/utils';

export function DateIndicator({
  topLabelRef,
  event,
}: {
  topLabelRef: React.RefObject<HTMLDivElement | null>;
  event: EventType;
}) {
  return (
    <div className="pl-6">
      <div
        ref={topLabelRef}
        className="scrollbar-hidden flex flex-1 items-center gap-2 overflow-x-hidden"
      >
        {event?.ranges.map((timePoint, index) => (
          <TopDateLabel
            key={timePoint}
            category={event.category}
            timePoint={timePoint}
            className={cn('min-w-[52px] flex-1 py-2 text-center', {
              'mr-2': !dayjs(event.ranges[index], 'YYYY.MM.DD')
                .add(1, 'day')
                .isSame(dayjs(event.ranges[index + 1], 'YYYY.MM.DD')),
            })}
          />
        ))}
      </div>
    </div>
  );
}

function TopDateLabel({
  category,
  timePoint,
  className,
  style,
}: {
  category: 'DAY' | 'DATE';
  timePoint: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const locale = useLocale();

  return (
    <div className={cn('text-center text-gray-30', className)} style={style}>
      {category === 'DATE' ? (
        <div className="flex flex-col text-sm-200">
          <span>{dayjs(timePoint, 'YYYY.MM.DD').format('ddd')}</span>
          <span>{dayjs(timePoint, 'YYYY.MM.DD').format('MM.DD')}</span>
        </div>
      ) : (
        <span className="text-md-200">
          {locale === 'ko'
            ? timePoint
            : dayjs()
                .day(
                  weekdaysShortKo.findIndex((weekday) => weekday === timePoint),
                )
                .format('ddd')}
        </span>
      )}
    </div>
  );
}

export function TimeIndicator({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) {
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
