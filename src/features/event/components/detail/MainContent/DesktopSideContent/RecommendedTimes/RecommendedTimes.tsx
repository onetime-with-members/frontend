import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import SectionHeading from '../../../shared/SectionHeading';
import RecommendedTime from './RecommendedTime';
import { ClockIcon } from '@/components/icon';
import { EventParticipantFilterContext } from '@/features/event/contexts/EventParticipantFilterContext';
import cn from '@/lib/cn';

export default function RecommendedTimes({
  className,
}: {
  className?: string;
}) {
  const { recommendedTimes } = useContext(EventParticipantFilterContext);

  const t = useTranslations('eventDetail');

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <SectionHeading icon={<ClockIcon className="mr-1" />} sticky>
        {t('recommendedTime', {
          count: recommendedTimes.length,
        })}
      </SectionHeading>
      <div className="flex flex-col gap-6">
        {recommendedTimes.map((recommendedTime, index) => (
          <RecommendedTime key={index} recommendedTime={recommendedTime} />
        ))}
      </div>
    </div>
  );
}
