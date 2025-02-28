import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Header from '../Header/Header';
import RecommendedTime from './RecommendedTime/RecommendedTime';
import { useRecommendedTimesQuery } from '@/queries/event.queries';

export default function RecommendedTimes() {
  const params = useParams<{ eventId: string }>();
  const { t } = useTranslation();

  const { data: recommendedTimes } = useRecommendedTimesQuery(params.eventId);

  return (
    <div className="flex flex-col gap-1">
      <Header>{t('eventDetail.mostAvailable')}</Header>
      <div className="flex flex-col gap-6">
        {recommendedTimes?.map((recommendedTime, index) => (
          <RecommendedTime key={index} recommendedTime={recommendedTime} />
        ))}
      </div>
    </div>
  );
}
