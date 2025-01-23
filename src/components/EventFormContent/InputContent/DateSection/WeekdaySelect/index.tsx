import dayjs from 'dayjs';

import DateItem from '../DateItem';
import { EventValue } from '@/types/event.type';
import cn from '@/utils/cn';

interface WeekdaySelectProps {
  className?: string;
  value: EventValue;
  setValue: React.Dispatch<React.SetStateAction<EventValue>>;
}

export default function WeekdaySelect({
  className,
  value,
  setValue,
}: WeekdaySelectProps) {
  function handleDateItemClick(weekday: string) {
    setValue((prev) => ({
      ...prev,
      ranges: prev.ranges.includes(weekday)
        ? prev.ranges.filter((range) => range !== weekday)
        : [...prev.ranges, weekday],
    }));
  }

  return (
    <div className={cn('flex gap-3', className)}>
      {dayjs.weekdaysMin().map((weekday) => (
        <DateItem
          key={weekday}
          active={value.ranges.includes(weekday)}
          onClick={() => handleDateItemClick(weekday)}
        >
          {weekday}
        </DateItem>
      ))}
    </div>
  );
}
