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
    touchScrollDisableStyle,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  } = useDragSelect<string>({
    selectFn: ({ data: newDate, isFilling }) => {
      setValue((prev) => ({
        ...prev,
        ranges: isFilling
          ? [...new Set([...prev.ranges, newDate])]
          : prev.ranges.filter((range) => range !== newDate),
      }));
    },
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
                onMouseMove={(event) =>
                  handleDragMove({
                    event,
                  })
                }
                onMouseUp={(event) => handleDragEnd({ event })}
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
                onTouchMove={(event) => handleDragMove({ event })}
                onTouchEnd={(event) => handleDragEnd({ event })}
                style={touchScrollDisableStyle}
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
