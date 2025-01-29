import dayjs from 'dayjs';
import { useState } from 'react';

import DateItem from '../DateItem';
import useDragSelect from '@/hooks/useDragSelect';
import { EventValue } from '@/types/event.type';
import cn from '@/utils/cn';
import { eventTarget } from '@/utils/event-target';
import { IconTriangleFilled } from '@tabler/icons-react';

interface CalendarSelectProps {
  className?: string;
  value: EventValue;
  setValue: React.Dispatch<React.SetStateAction<EventValue>>;
}

export default function CalendarSelect({
  className,
  value,
  setValue,
}: CalendarSelectProps) {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const {
    isFilling,
    cssStyle,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  } = useDragSelect({
    onSelect: handleDateItemSelect,
  });

  const firstWeekdayIndex = currentDate.startOf('month').day();
  const lastDate = currentDate.endOf('month').date();
  const isPrevDisabled = currentDate
    .subtract(1, 'month')
    .isBefore(dayjs(), 'month');

  function currentDateFormat(date: number) {
    return currentDate.date(date).format('YYYY.MM.DD');
  }

  function handlePrevMonth() {
    if (isPrevDisabled) return;
    setCurrentDate((prev) => prev.subtract(1, 'month'));
  }

  function handleNextMonth() {
    setCurrentDate((prev) => prev.add(1, 'month'));
  }

  function handleDateItemSelect(event: React.MouseEvent | React.TouchEvent) {
    const target = eventTarget(event);
    if (!target) return;
    if (target.getAttribute('aria-disabled') === 'true') return;
    const date = target.dataset.date;
    if (!date) return;
    setValue((prev) => ({
      ...prev,
      ranges: isFilling
        ? [...new Set([...prev.ranges, date])]
        : prev.ranges.filter((range) => range !== date),
    }));
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex justify-between">
        <div className="text-gray-90 text-lg-300">
          {currentDate.format('YYYY.MM')}
        </div>
        <div className="flex items-center gap-4">
          <button
            className={cn(
              'flex w-6 -rotate-90 items-center justify-center text-gray-90',
              {
                'text-gray-15': isPrevDisabled,
              },
            )}
            onClick={handlePrevMonth}
          >
            <IconTriangleFilled size={12} />
          </button>
          <button
            className="flex w-6 rotate-90 items-center justify-center text-gray-90"
            onClick={handleNextMonth}
          >
            <IconTriangleFilled size={12} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-3">
        {dayjs.weekdaysMin().map((weekday) => (
          <div key={weekday} className="text-center text-gray-30 text-md-200">
            {weekday}
          </div>
        ))}
        {Array.from({ length: firstWeekdayIndex }, (_, index) => (
          <DateItem key={index} className="opacity-0">
            {index}
          </DateItem>
        ))}
        {Array.from({ length: lastDate }, (_, index) => index + 1).map(
          (date) => (
            <div key={date} className="flex items-center justify-center">
              <DateItem
                key={date}
                data-date={currentDateFormat(date)}
                active={value.ranges.includes(currentDateFormat(date))}
                disabled={currentDate.date(date).isBefore(dayjs(), 'date')}
                aria-disabled={currentDate.date(date).isBefore(dayjs(), 'date')}
                onMouseDown={() =>
                  handleDragStart({
                    isFilling: !value.ranges.includes(currentDateFormat(date)),
                  })
                }
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onTouchStart={() =>
                  handleDragStart({
                    isFilling: !value.ranges.includes(currentDateFormat(date)),
                  })
                }
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                style={cssStyle}
              >
                {date}
              </DateItem>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
