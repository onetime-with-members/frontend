import { useTranslations } from 'next-intl';
import Skeleton from 'react-loading-skeleton';

import { SKELETON_DARK_GRAY } from '@/constants';
import { MyEventType } from '@/features/user/types';
import dayjs from '@/lib/dayjs';

export default function EventContent({
  event,
  isPending,
}: {
  event: MyEventType;
  isPending: boolean;
}) {
  const t = useTranslations('common');

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1 text-gray-30 text-sm-200">
        <span>
          {!isPending ? (
            dayjs(event.created_date).fromNow()
          ) : (
            <Skeleton width={100} baseColor={SKELETON_DARK_GRAY} />
          )}
        </span>
        <span>·</span>
        <span>
          {!isPending ? (
            t('participantCount', {
              count: event.participant_count,
            })
          ) : (
            <Skeleton width={50} baseColor={SKELETON_DARK_GRAY} />
          )}
        </span>
      </div>
      <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-80 text-md-300 sm:text-lg-300">
        {!isPending ? (
          event.title
        ) : (
          <Skeleton width={200} baseColor={SKELETON_DARK_GRAY} />
        )}
      </h1>
    </div>
  );
}
