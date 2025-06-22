import { useLocale } from 'next-intl';
import { useContext, useState } from 'react';

import DateItem from './date-item';
import { WeekdayLocaleContext } from '@/contexts/weekday-locale';
import useDragSelect from '@/hooks/useDragSelect';
import cn from '@/lib/cn';
import { weekdaysShortKo } from '@/lib/constants';
import dayjs from '@/lib/dayjs';
import { EventValueType } from '@/lib/types';
import { eventTarget } from '@/lib/utils';
import { IconTriangleFilled } from '@tabler/icons-react';

export function WeekdaySelect({
  className,
  value,
  setValue,
}: {
  className?: string;
  value: EventValueType;
  setValue: React.Dispatch<React.SetStateAction<EventValueType>>;
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

export function CalendarSelect({
  className,
  value,
  setValue,
}: {
  className?: string;
  value: EventValueType;
  setValue: React.Dispatch<React.SetStateAction<EventValueType>>;
}) {
  const [currentDate, setCurrentDate] = useState(dayjs());

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

  const locale = useLocale();

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
        ? Array.from(new Set([...prev.ranges, date]))
        : prev.ranges.filter((range) => range !== date),
    }));
  }

  return (
    <div
      className={cn('flex flex-col gap-3', className)}
      onMouseLeave={handleDragEnd}
    >
      <div className="flex justify-between">
        <div className="text-gray-90 text-lg-300">
          {currentDate.format(locale === 'ko' ? 'YYYY.MM' : 'MMMM YYYY')}
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
        {weekdaysShort.map((weekday) => (
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
