import dayjs from 'dayjs';

import cn from '@/utils/cn';

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
    <div className={cn('text-center', className)} style={style}>
      {category === 'DATE' ? (
        <div className="flex flex-col">
          <span className="text-gray-20 text-sm-200">
            {dayjs(timePoint, 'YYYY.MM.DD').format('ddd')}
          </span>
          <span className="text-gray-30 text-sm-200">
            {dayjs(timePoint, 'YYYY.MM.DD').format('MM.DD')}
          </span>
        </div>
      ) : (
        <span className="text-gray-30 text-md-200">{timePoint}</span>
      )}
    </div>
  );
}
