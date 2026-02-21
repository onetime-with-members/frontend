import { useLocale } from 'next-intl';

import { HumanIcon } from '@/components/icon';
import { weekdaysShortKo } from '@/constants';
import { RecommendedScheduleType } from '@/features/event/types';
import cn from '@/lib/cn';
import dayjs from '@/lib/dayjs';

export default function RecommendedTimeSlotItem({
  recommendedTime,
  isSelected,
  onClick,
}: {
  recommendedTime: RecommendedScheduleType;
  isSelected?: boolean;
  onClick: () => void;
}) {
  const locale = useLocale() as 'ko' | 'en';
  const total =
    recommendedTime.possible_names.length + recommendedTime.impossible_names.length;

  const dateLabel =
    recommendedTime.time_point.length === 10
      ? dayjs(recommendedTime.time_point, 'YYYY.MM.DD').format(
          locale === 'ko' ? 'M월 D일 ddd' : 'ddd, MMM D',
        )
      : dayjs()
          .day(
            weekdaysShortKo.findIndex((w) => w === recommendedTime.time_point),
          )
          .format(locale === 'ko' ? 'dddd' : 'dddd');

  return (
    <button
      type="button"
      className={cn(
        'flex w-full items-center justify-between gap-2 rounded-2xl border px-4 py-3 text-left transition-colors',
        {
          'border-primary-40 bg-primary-05': isSelected,
          'border-gray-10 bg-white hover:bg-gray-05': !isSelected,
        },
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          'flex min-w-0 flex-col',
          isSelected ? 'text-primary-40' : 'text-gray-60',
        )}
      >
        <span className="text-sm-200">{dateLabel}</span>
        <span className="text-lg-300">
          {recommendedTime.start_time} - {recommendedTime.end_time}
        </span>
      </div>
      <div
        className={cn(
          'flex shrink-0 items-center text-sm-200',
          isSelected ? 'text-primary-40' : 'text-gray-30',
        )}
      >
        <HumanIcon fontSize={18} />
        <span>
          {recommendedTime.possible_count}/{total}
        </span>
      </div>
    </button>
  );
}
