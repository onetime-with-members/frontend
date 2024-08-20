import clsx from 'clsx';
import dayjs from 'dayjs';

interface TBDayTopLabelProps {
  category: 'DAY' | 'DATE';
  timePoint: string;
  className?: string;
}

export default function TBDayTopLabel({
  category,
  timePoint,
  className,
}: TBDayTopLabelProps) {
  return (
    <div className={clsx('text-center', className)}>
      {category === 'DATE' ? (
        <div className="flex flex-col">
          <span className="text-sm-200 text-gray-20">
            {dayjs(timePoint, 'YYYY.MM.DD').format('dd')}
          </span>
          <span className="text-md-200 text-gray-30">
            {dayjs(timePoint, 'YYYY.MM.DD').format('MM.DD')}
          </span>
        </div>
      ) : (
        <span className="text-md-200 text-gray-30">{timePoint}</span>
      )}
    </div>
  );
}
