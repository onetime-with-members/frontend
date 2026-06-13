import { useContext } from 'react';

import RecommendedTime from './RecommendedTime';
import { EventParticipantFilterContext } from '@/features/event/contexts/EventParticipantFilterContext';
import cn from '@/lib/cn';

export default function RecommendedTimesList({
  className,
}: {
  className?: string;
}) {
  const { recommendedTimes } = useContext(EventParticipantFilterContext);

  return (
    <div className={cn('mt-2 flex flex-col gap-6', className)}>
      {recommendedTimes.map((recommendedTime, index) => (
        <RecommendedTime key={index} recommendedTime={recommendedTime} />
      ))}
    </div>
  );
}
