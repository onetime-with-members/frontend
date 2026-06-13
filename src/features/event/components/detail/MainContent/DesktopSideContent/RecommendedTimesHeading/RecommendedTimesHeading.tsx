import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { ClockIcon } from '@/components/icon';
import SectionHeading from '@/features/event/components/detail/shared/SectionHeading';
import { EventParticipantFilterContext } from '@/features/event/contexts/EventParticipantFilterContext';

export default function RecommendedTimesHeading({
  className,
}: {
  className?: string;
}) {
  const { recommendedTimes } = useContext(EventParticipantFilterContext);

  const t = useTranslations('event.pages.EventDetailPage');

  return (
    <SectionHeading
      icon={<ClockIcon className="mr-1" />}
      sticky
      className={className}
    >
      {t('recommendedTime', {
        count: recommendedTimes.length,
      })}
    </SectionHeading>
  );
}
