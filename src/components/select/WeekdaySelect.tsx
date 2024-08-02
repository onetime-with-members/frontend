import clsx from 'clsx';
import dayjs from 'dayjs';

import { SELECTED_DATE_LIST_FORMAT } from '../../constants/date';
import DateItem from '../DateItem';

interface WeekdaySelectProps {
  className?: string;
  selectedDateList: string[];
  selectDate: (date: string) => void;
}

export default function WeekdaySelect({
  className,
  selectedDateList,
  selectDate,
}: WeekdaySelectProps) {
  function handleDateItemClick(weekdayIndex: number) {
    const selectedDate = dayjs()
      .day(weekdayIndex)
      .format(SELECTED_DATE_LIST_FORMAT);
    selectDate(selectedDate);
  }

  return (
    <div className={clsx('flex gap-3', className)}>
      {dayjs.weekdaysMin().map((weekday, weekdayIndex) => (
        <DateItem
          key={weekday}
          active={selectedDateList.includes(
            dayjs().day(weekdayIndex).format(SELECTED_DATE_LIST_FORMAT),
          )}
          onClick={() => handleDateItemClick(weekdayIndex)}
        >
          {weekday}
        </DateItem>
      ))}
    </div>
  );
}
