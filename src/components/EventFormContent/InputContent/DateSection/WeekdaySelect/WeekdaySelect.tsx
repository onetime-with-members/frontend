import dayjs from 'dayjs';

import DateItem from '../DateItem/DateItem';
import useDragSelect from '@/hooks/useDragSelect';
import { EventValueType } from '@/types/event.type';
import cn from '@/utils/cn';
import { eventTarget } from '@/utils/event-target';

interface WeekdaySelectProps {
  className?: string;
  value: EventValueType;
  setValue: React.Dispatch<React.SetStateAction<EventValueType>>;
}

export default function WeekdaySelect({
  className,
  value,
  setValue,
}: WeekdaySelectProps) {
  const {
    isFilling,
    cssStyle,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  } = useDragSelect({
    onSelect: handleDateItemSelect,
  });

  function handleDateItemSelect(event: React.MouseEvent | React.TouchEvent) {
    const target = eventTarget(event);
    if (!target) return;
    const weekday = target.dataset.weekday;
    if (!weekday) return;
    setValue((prev) => ({
      ...prev,
      ranges: isFilling
        ? [...new Set([...prev.ranges, weekday])]
        : prev.ranges.filter((range) => range !== weekday),
    }));
  }

  return (
    <div className={cn('flex gap-3', className)} onMouseLeave={handleDragEnd}>
      {dayjs.weekdaysMin().map((weekday) => (
        <DateItem
          key={weekday}
          data-weekday={weekday}
          active={value.ranges.includes(weekday)}
          onMouseDown={() =>
            handleDragStart({ isFilling: !value.ranges.includes(weekday) })
          }
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchStart={() =>
            handleDragStart({ isFilling: !value.ranges.includes(weekday) })
          }
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={cssStyle}
        >
          {weekday}
        </DateItem>
      ))}
    </div>
  );
}
