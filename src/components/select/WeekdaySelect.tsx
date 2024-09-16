import clsx from 'clsx';
import dayjs from 'dayjs';

import { EventType } from '../../types/event.type';
import DateItem from '../DateItem';

interface WeekdaySelectProps {
  className?: string;
  value: EventType;
  setValue: React.Dispatch<React.SetStateAction<EventType>>;
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
    <div className={clsx('flex gap-3', className)}>
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
