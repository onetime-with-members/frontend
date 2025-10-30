import { useContext } from 'react';

import DateItem from '../DateItem';
import { weekdaysShortKo } from '@/constants';
import { WeekdayLocaleContext } from '@/contexts/WeekdayLocaleContext';
import useDragSelect from '@/hooks/useDragSelect';
import cn from '@/lib/cn';
import { eventTarget } from '@/utils';

export default function WeekdaySelect({
  className,
  ranges,
  setRanges,
}: {
  className?: string;
  ranges: string[];
  setRanges: (ranges: string[]) => void;
}) {
  const { weekdaysShort } = useContext(WeekdayLocaleContext);

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
    setRanges(
      isFilling
        ? Array.from(new Set([...ranges, weekday]))
        : ranges.filter((range) => range !== weekday),
    );
  }

  function weekdayKOR(weekday: string) {
    return weekdaysShortKo[weekdaysShort.indexOf(weekday)];
  }

  function isActive(weekday: string) {
    return ranges.includes(weekdayKOR(weekday));
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
