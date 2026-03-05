import { useLocale } from 'next-intl';

import { HumanIcon } from '@/components/icon';
import { weekdaysShortKo } from '@/constants';
import { RecommendedScheduleType } from '@/features/event/types';
import cn from '@/lib/cn';
import dayjs from '@/lib/dayjs';

export default function RecommendedTimeItem({
  recommendedTime,
  isSelected,
  onClick,
}: {
  recommendedTime: RecommendedScheduleType;
  isSelected: boolean;
  onClick: () => void;
}) {
  const locale = useLocale();

  const total =
    recommendedTime.possible_names.length +
    recommendedTime.impossible_names.length;
  const dateLabel =
    recommendedTime.time_point.length === 10
      ? dayjs(recommendedTime.time_point, 'YYYY.MM.DD').format(
          locale === 'ko' ? 'M월 D일 ddd' : 'ddd, MMM D',
        )
      : dayjs()
          .day(
            weekdaysShortKo.findIndex((w) => w === recommendedTime.time_point),
          )
          .format('dddd');

  return (
    <li>
      <button
        type="button"
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-2xl border px-4 py-3 text-left transition-colors',
          {
            'bg-primary-05 border-primary-40': isSelected,
            'border-gray-10 bg-white hover:bg-gray-05': !isSelected,
          },
        )}
        onClick={onClick}
      >
        <div
          className={cn('flex min-w-0 flex-col text-gray-60', {
            'text-primary-40': isSelected,
          })}
        >
          <span className="text-sm-200">{dateLabel}</span>
          <span className="text-lg-300">
            {recommendedTime.start_time} - {recommendedTime.end_time}
          </span>
        </div>
        <div
          className={cn('flex shrink-0 items-center text-gray-30 text-sm-200', {
            'text-success-60': recommendedTime.possible_count === total,
            'text-primary-40': isSelected,
          })}
        >
          <HumanIcon fontSize={18} />
          <span>
            {recommendedTime.possible_count}/{total}
          </span>
        </div>
      </button>
    </li>
  );
}
