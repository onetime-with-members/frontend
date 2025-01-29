import dayjs from 'dayjs';
import { useState } from 'react';

import DateItem from '../DateItem';
import { SELECTED_DATE_LIST_FORMAT } from '@/constants/date';
import useDragSelect from '@/hooks/useDragSelect';
import { EventValue } from '@/types/event.type';
import cn from '@/utils/cn';
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
    onSelect: handleTimeBlockSelect,
  });

  const firstWeekdayIndex = currentDate.startOf('month').day();
  const lastDate = currentDate.endOf('month').date();
  const isPrevDisabled = currentDate
    .subtract(1, 'month')
    .isBefore(dayjs(), 'month');

  function formatFor({
    year,
    month,
    date,
  }: {
    year: number;
    month: number;
    date: number;
  }) {
    return dayjs(new Date(year, month, date)).format(SELECTED_DATE_LIST_FORMAT);
  }

  function handlePrevMonth() {
    if (isPrevDisabled) return;
    setCurrentDate((prev) => prev.subtract(1, 'month'));
  }

  function handleNextMonth() {
    setCurrentDate((prev) => prev.add(1, 'month'));
  }

  function handleTimeBlockSelect(event: React.MouseEvent | React.TouchEvent) {
    if (event.currentTarget.getAttribute('aria-disabled') === 'true') return;
    const date = dateInDatasetFrom(event);
    if (!date) return;
    setValue((prev) => ({
      ...prev,
      ranges: isFilling
        ? [...new Set([...prev.ranges, date])]
        : prev.ranges.filter((range) => range !== date),
    }));

    function dateInDatasetFrom(event: React.MouseEvent | React.TouchEvent) {
      let result;
      if (event.type.includes('mouse')) {
        result = (event.currentTarget as HTMLElement).dataset.date;
      } else if (event.type.includes('touch')) {
        const touch = (event as React.TouchEvent).touches[0];
        if (!touch) return;
        const touchedTarget = document.elementFromPoint(
          touch.clientX,
          touch.clientY,
        ) as HTMLElement;
        if (!touchedTarget) return;
        result = touchedTarget.dataset.date;
      }
      if (!result) return;
      return result;
    }
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
                data-date={formatFor({
                  year: currentDate.year(),
                  month: currentDate.month(),
                  date,
                })}
                active={value.ranges.includes(
                  formatFor({
                    year: currentDate.year(),
                    month: currentDate.month(),
                    date,
                  }),
                )}
                disabled={currentDate.date(date).isBefore(dayjs(), 'date')}
                aria-disabled={currentDate.date(date).isBefore(dayjs(), 'date')}
                onMouseDown={() =>
                  handleDragStart({
                    isFilling: !value.ranges.includes(
                      formatFor({
                        year: currentDate.year(),
                        month: currentDate.month(),
                        date,
                      }),
                    ),
                  })
                }
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onTouchStart={() =>
                  handleDragStart({
                    isFilling: !value.ranges.includes(
                      formatFor({
                        year: currentDate.year(),
                        month: currentDate.month(),
                        date,
                      }),
                    ),
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
