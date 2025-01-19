import clsx from 'clsx';
import dayjs from 'dayjs';

interface TBDayTopLabelProps {
  category: 'DAY' | 'DATE';
  timePoint: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function TBDayTopLabel({
  category,
  timePoint,
  className,
  style,
}: TBDayTopLabelProps) {
  return (
    <div className={clsx('text-center', className)} style={style}>
      {category === 'DATE' ? (
        <div className="flex flex-col">
          <span className="text-gray-20 text-sm-200">
            {dayjs(timePoint, 'YYYY.MM.DD').format('dd')}
          </span>
          <span className="text-gray-30 text-md-200">
            {dayjs(timePoint, 'YYYY.MM.DD').format('MM.DD')}
          </span>
        </div>
      ) : (
        <span className="text-gray-30 text-md-200">{timePoint}</span>
      )}
    </div>
  );
}
