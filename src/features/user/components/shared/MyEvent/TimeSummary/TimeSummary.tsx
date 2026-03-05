import { useLocale, useTranslations } from 'next-intl';
import Skeleton from 'react-loading-skeleton';

import { AlarmIcon } from '@/components/icon';
import { SKELETON_DARK_GRAY } from '@/constants';
import {
  getConfirmedTimeText,
  getRecommendedTimeText,
} from '@/features/event/utils';
import { MyEventType } from '@/features/user/types';
import cn from '@/lib/cn';
import { IconChevronRight } from '@tabler/icons-react';

export default function TimeSummary({
  event,
  isPending,
}: {
  event: MyEventType;
  isPending: boolean;
}) {
  const t = useTranslations('user.components.MyEvent');
  const locale = useLocale();

  const recommendedTime =
    event.most_possible_times.length > 0 ? event.most_possible_times[0] : null;
  const confirmedTime = event.confirmation;

  const isRecommendedOrConfirmed = !!recommendedTime || !!confirmedTime;

  if (isPending) {
    return (
      <Skeleton
        height={44}
        borderRadius="0.5rem"
        baseColor={SKELETON_DARK_GRAY}
      />
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-lg bg-gray-05 px-4 py-3',
        {
          'bg-primary-00': isRecommendedOrConfirmed,
        },
      )}
    >
      <div
        className={cn(
          'flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-gray-40 text-sm-200 xs:text-md-200',
          {
            'text-primary-50': isRecommendedOrConfirmed,
          },
        )}
      >
        {isRecommendedOrConfirmed ? (
          <>
            <span className="text-lg xs:text-xl">
              <AlarmIcon innerfill="#e8ebfc" />
            </span>
            {confirmedTime ? (
              <span>
                {getConfirmedTimeText({
                  confirmedTime,
                  category: event.category,
                  locale,
                })}
              </span>
            ) : recommendedTime ? (
              <span>
                {getRecommendedTimeText({
                  recommendedTime,
                  category: event.category,
                  locale,
                })}
              </span>
            ) : null}
          </>
        ) : (
          <span>{t('noOneSchedule')}</span>
        )}
      </div>
      <div>
        <IconChevronRight
          size={20}
          className={cn('text-gray-30', {
            'text-primary-20': isRecommendedOrConfirmed,
          })}
        />
      </div>
    </div>
  );
}
