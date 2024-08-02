import clsx from 'clsx';
import dayjs from 'dayjs';
import { useState } from 'react';

import { SELECTED_DATE_LIST_FORMAT } from '../../constants/date';
import DateItem from '../DateItem';
import { IconTriangleFilled } from '@tabler/icons-react';

interface CalendarSelectProps {
  className?: string;
  selectedDateList: string[];
  selectDate: (date: string) => void;
}

export default function CalendarSelect({
  className,
  selectedDateList,
  selectDate,
}: CalendarSelectProps) {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const firstWeekdayIndex = currentDate.startOf('month').day();
  const lastDate = currentDate.endOf('month').date();
  const isPrevDisabled = currentDate
    .subtract(1, 'month')
    .isBefore(dayjs(), 'month');

  function handlePrevMonth() {
    if (isPrevDisabled) return;
    setCurrentDate((prev) => prev.subtract(1, 'month'));
  }

  function handleNextMonth() {
    setCurrentDate((prev) => prev.add(1, 'month'));
  }

  function handleDateItemClick(date: number) {
    const selectedDate = currentDate
      .date(date)
      .format(SELECTED_DATE_LIST_FORMAT);
    selectDate(selectedDate);
  }

  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      <div className="flex items-center justify-between">
        <div className="text-lg-300 text-gray-90">
          {currentDate.format('YYYY.MM')}
        </div>
        <div className="flex items-center gap-8">
          <IconTriangleFilled
            size={12}
            className={clsx('-rotate-90', {
              'text-gray-15': isPrevDisabled,
              'text-gray-90': !isPrevDisabled,
            })}
            onClick={handlePrevMonth}
          />
          <IconTriangleFilled
            size={12}
            className="rotate-90 text-gray-90"
            onClick={handleNextMonth}
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-3">
        {dayjs.weekdaysMin().map((weekday) => (
          <div key={weekday} className="text-md-200 text-center text-gray-30">
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
            <DateItem
              key={date}
              active={selectedDateList.includes(
                currentDate.date(date).format(SELECTED_DATE_LIST_FORMAT),
              )}
              onClick={() => handleDateItemClick(date)}
            >
              {date}
            </DateItem>
          ),
        )}
      </div>
    </div>
  );
}
