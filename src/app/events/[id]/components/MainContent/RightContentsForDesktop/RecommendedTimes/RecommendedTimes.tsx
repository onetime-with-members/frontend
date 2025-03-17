import { useTranslations } from 'next-intl';

import Header from '../Header/Header';
import RecommendedTime from './RecommendedTime/RecommendedTime';
import { useRecommendedTimesQuery } from '@/queries/event.queries';
import { useParams } from 'next/navigation';

export default function RecommendedTimes() {
  const params = useParams<{ id: string }>();
  const t = useTranslations('eventDetail');

  const { data: recommendedTimes } = useRecommendedTimesQuery(params.id);

  return (
    <div className="flex flex-col gap-1">
      <Header>{t('mostAvailable')}</Header>
      <div className="flex flex-col gap-6">
        {recommendedTimes?.map((recommendedTime, index) => (
          <RecommendedTime key={index} recommendedTime={recommendedTime} />
        ))}
      </div>
    </div>
  );
}
