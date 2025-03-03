import DateItem from '../DateItem/DateItem';
import useDragSelect from '@/hooks/useDragSelect';
import { EventValueType } from '@/types/event.type';
import cn from '@/utils/cn';
import { eventTarget } from '@/utils/event-target';
import { weekdaysShort, weekdaysShortKo } from '@/utils/weekday';

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
    const weekdayData = target.dataset.weekday;
    if (!weekdayData) return;
    const weekday = weekdayKOR(weekdayData);
    setValue((prev) => ({
      ...prev,
      ranges: isFilling
        ? Array.from(new Set([...prev.ranges, weekday]))
        : prev.ranges.filter((range) => range !== weekday),
    }));
  }

  function weekdayKOR(weekday: string) {
    return weekdaysShortKo[weekdaysShort.indexOf(weekday)];
  }

  function isActive(weekday: string) {
    return value.ranges.includes(weekdayKOR(weekday));
  }

  return (
    <div className={cn('flex gap-3', className)} onMouseLeave={handleDragEnd}>
      {weekdaysShort.map((weekday) => (
        <DateItem
          key={weekday}
          data-weekday={weekday}
          active={isActive(weekday)}
          onMouseDown={() => handleDragStart({ isFilling: !isActive(weekday) })}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchStart={() =>
            handleDragStart({ isFilling: !isActive(weekday) })
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
