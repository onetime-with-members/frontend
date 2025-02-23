import dayjs from 'dayjs';

import cn from '@/utils/cn';
import { weekdaysShortKo } from '@/utils/weekday';

interface TopDateLabelProps {
  category: 'DAY' | 'DATE';
  timePoint: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function TopDateLabel({
  category,
  timePoint,
  className,
  style,
}: TopDateLabelProps) {
  return (
    <div className={cn('text-center text-gray-30', className)} style={style}>
      {category === 'DATE' ? (
        <div className="flex flex-col text-sm-200">
          <span>{dayjs(timePoint, 'YYYY.MM.DD').format('ddd')}</span>
          <span>{dayjs(timePoint, 'YYYY.MM.DD').format('MM.DD')}</span>
        </div>
      ) : (
        <span className="text-md-200">
          {dayjs()
            .day(weekdaysShortKo.findIndex((weekday) => weekday === timePoint))
            .format('ddd')}
        </span>
      )}
    </div>
  );
}
