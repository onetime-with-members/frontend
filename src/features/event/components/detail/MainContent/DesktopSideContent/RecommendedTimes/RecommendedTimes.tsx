import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import SectionHeading from '../../../shared/SectionHeading';
import RecommendedTime from './RecommendedTime';
import { ClockIcon } from '@/components/icon';
import { EventParticipantFilterContext } from '@/features/event/contexts/EventParticipantFilterContext';
import cn from '@/lib/cn';

export function RecommendedTimesHeading({
  className,
}: {
  className?: string;
}) {
  const { recommendedTimes } = useContext(EventParticipantFilterContext);
  const t = useTranslations('event.pages.EventDetailPage');

  return (
    <div className={cn(className)}>
      <SectionHeading icon={<ClockIcon className="mr-1" />} sticky>
        {t('recommendedTime', {
          count: recommendedTimes.length,
        })}
      </SectionHeading>
    </div>
  );
}

export function RecommendedTimesList({
  className,
}: {
  className?: string;
}) {
  const { recommendedTimes } = useContext(EventParticipantFilterContext);

  return (
    <div className={cn('flex flex-col gap-6 mt-2', className)}>
      {recommendedTimes.map((recommendedTime, index) => (
        <RecommendedTime key={index} recommendedTime={recommendedTime} />
      ))}
    </div>
  );
}

export default function RecommendedTimes({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <RecommendedTimesHeading />
      <RecommendedTimesList />
    </div>
  );
}
