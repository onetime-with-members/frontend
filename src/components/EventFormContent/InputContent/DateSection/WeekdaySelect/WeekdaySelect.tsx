import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import DateItem from '../DateItem/DateItem';
import useDragSelect from '@/hooks/useDragSelect';
import { AppDispatch, RootState } from '@/store';
import { changeEvent } from '@/store/eventSlice';
import cn from '@/utils/cn';
import { eventTarget } from '@/utils/event-target';

interface WeekdaySelectProps {
  className?: string;
}

export default function WeekdaySelect({ className }: WeekdaySelectProps) {
  const { eventValue } = useSelector((state: RootState) => state.event);
  const dispatch = useDispatch<AppDispatch>();

  const {
    isFilling,
    cssStyle,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  } = useDragSelect({
    onSelect: handleDateItemSelect,
  });

  function handleDateItemSelect(e: React.MouseEvent | React.TouchEvent) {
    const target = eventTarget(e);
    if (!target) return;
    const weekday = target.dataset.weekday;
    if (!weekday) return;
    dispatch(
      changeEvent({
        ...eventValue,
        ranges: isFilling
          ? [...new Set([...eventValue.ranges, weekday])]
          : eventValue.ranges.filter((range) => range !== weekday),
      }),
    );
  }

  return (
    <div className={cn('flex gap-3', className)} onMouseLeave={handleDragEnd}>
      {dayjs.weekdaysMin().map((weekday) => (
        <DateItem
          key={weekday}
          data-weekday={weekday}
          active={eventValue.ranges.includes(weekday)}
          onMouseDown={() =>
            handleDragStart({ isFilling: !eventValue.ranges.includes(weekday) })
          }
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchStart={() =>
            handleDragStart({ isFilling: !eventValue.ranges.includes(weekday) })
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
