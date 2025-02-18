import { useParams } from 'react-router-dom';

import RecommendedTime from './RecommendedTime/RecommendedTime';
import { useRecommendedTimesQuery } from '@/queries/event.queries';

export default function RecommendedTimes() {
  const params = useParams<{ eventId: string }>();

  const { data: recommendedTimes } = useRecommendedTimesQuery(params.eventId);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-gray-90 text-lg-300">가장 많이 되는 시간대</h2>
      <div className="flex flex-col gap-6">
        {recommendedTimes?.map((recommendedTime, index) => (
          <RecommendedTime key={index} recommendedTime={recommendedTime} />
        ))}
      </div>
    </div>
  );
}
