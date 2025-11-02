import { useLocale } from 'next-intl';

import { weekdaysShortKo } from '@/constants';
import cn from '@/lib/cn';
import dayjs from '@/lib/dayjs';

export default function TopDateLabel({
  category,
  timePoint,
  className,
  style,
}: {
  category: 'DAY' | 'DATE';
  timePoint: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const locale = useLocale();

  return (
    <div className={cn('text-center text-gray-30', className)} style={style}>
      {category === 'DATE' ? (
        <div className="flex flex-col text-sm-200">
          <span>{dayjs(timePoint, 'YYYY.MM.DD').format('ddd')}</span>
          <span>{dayjs(timePoint, 'YYYY.MM.DD').format('MM.DD')}</span>
        </div>
      ) : (
        <span className="text-md-200">
          {locale === 'ko'
            ? timePoint
            : dayjs()
                .day(
                  weekdaysShortKo.findIndex((weekday) => weekday === timePoint),
                )
                .format('ddd')}
        </span>
      )}
    </div>
  );
}
