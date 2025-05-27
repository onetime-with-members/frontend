import dayjs from 'dayjs';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import ParticipantsSection from './ParticipantsSection/ParticipantsSection';
import ClockIcon from '@/components/icon/ClockIcon';
import { SKELETON_DARK_GRAY, SKELETON_GRAY } from '@/lib/constants';
import { RecommendScheduleType } from '@/lib/types';
import { useEventQuery } from '@/queries/event.queries';
import { weekdaysShortKo } from '@/utils/weekday';
import { useParams } from 'next/navigation';

interface RecommendedTimeProps {
  recommendedTime: RecommendScheduleType;
  isPending?: boolean;
}

export default function RecommendedTime({
  recommendedTime,
  isPending,
}: RecommendedTimeProps) {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  return (
    <SkeletonTheme baseColor={SKELETON_DARK_GRAY} borderRadius={9999}>
      <div
        className="flex flex-col gap-3 rounded-2xl bg-gray-00 p-5"
        style={{
          ...(isPending && { backgroundColor: SKELETON_GRAY }),
        }}
      >
        <h3 className="flex items-center gap-1 text-primary-50 text-md-300">
          <span>
            {!isPending ? (
              <ClockIcon fill="#4c65e5" size={20} />
            ) : (
              <Skeleton width={20} />
            )}
          </span>
          <span className="flex items-center gap-2">
            <span>
              {!isPending ? (
                event && event.category === 'DATE' ? (
                  dayjs(recommendedTime.time_point, 'YYYY.MM.DD').format(
                    'YYYY.MM.DD (ddd)',
                  )
                ) : (
                  dayjs()
                    .day(
                      weekdaysShortKo.findIndex(
                        (weekday) => weekday === recommendedTime.time_point,
                      ),
                    )
                    .format('dddd')
                )
              ) : (
                <Skeleton width={125} />
              )}
            </span>
            <span>
              {!isPending ? (
                `${recommendedTime.start_time} - ${recommendedTime.end_time}`
              ) : (
                <Skeleton width={100} />
              )}
            </span>
          </span>
        </h3>
        <div className="flex flex-col gap-5">
          <ParticipantsSection
            type="available"
            participants={recommendedTime.possible_names}
            isPending={isPending}
          />
          <ParticipantsSection
            type="unavailable"
            participants={recommendedTime.impossible_names}
            isPending={isPending}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
}
