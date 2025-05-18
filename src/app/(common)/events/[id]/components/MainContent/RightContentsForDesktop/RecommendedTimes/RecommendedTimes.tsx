import { useTranslations } from 'next-intl';
import Skeleton from 'react-loading-skeleton';

import Header from '../Header/Header';
import RecommendedTime from './RecommendedTime/RecommendedTime';
import { SKELETON_GRAY, defaultRecommendTime } from '@/lib/constants';
import { useRecommendedTimesQuery } from '@/queries/event.queries';
import { useParams } from 'next/navigation';

export default function RecommendedTimes() {
  const params = useParams<{ id: string }>();
  const t = useTranslations('eventDetail');

  const { data: recommendedTimes, isPending } = useRecommendedTimesQuery(
    params.id,
  );

  return (
    <div className="flex flex-col gap-1">
      <Header>
        {!isPending ? (
          t('mostAvailable')
        ) : (
          <Skeleton width={200} baseColor={SKELETON_GRAY} borderRadius={9999} />
        )}
      </Header>
      <div className="flex flex-col gap-6">
        {!isPending && recommendedTimes
          ? recommendedTimes.map((recommendedTime, index) => (
              <RecommendedTime key={index} recommendedTime={recommendedTime} />
            ))
          : Array.from({ length: 2 }, (_, index) => (
              <RecommendedTime
                key={index}
                recommendedTime={defaultRecommendTime}
                isPending={isPending}
              />
            ))}
      </div>
    </div>
  );
}
