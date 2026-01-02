import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import SectionHeading from '../../../shared/SectionHeading';
import MobileRecommendedTimeItem from './MobileRecommendedTimeItem';
import { ClockIcon } from '@/components/icon';
import { EventParticipantFilterContext } from '@/features/event/contexts/EventParticipantFilterContext';

export default function BottomSheetInnerContent() {
  const { recommendedTimes } = useContext(EventParticipantFilterContext);

  const t = useTranslations('eventDetail');

  return (
    <>
      <SectionHeading
        icon={<ClockIcon className="mr-1" />}
        className="px-4 py-0 pb-3"
      >
        {t('recommendedTime', { count: recommendedTimes?.length })}
      </SectionHeading>
      <div className="flex flex-1 flex-col gap-3 px-4 pb-12">
        {recommendedTimes?.map((recommendedTime, index) => (
          <MobileRecommendedTimeItem
            key={index}
            recommendedTime={recommendedTime}
          />
        ))}
      </div>
      <div className="h-[88px]" />
    </>
  );
}
