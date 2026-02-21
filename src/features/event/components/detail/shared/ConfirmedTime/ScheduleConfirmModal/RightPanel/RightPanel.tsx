'use client';

import { useTranslations } from 'next-intl';

import RecommendedTimeSlotItem from '../RecommendedTimeSlotItem';
import { RecommendedScheduleType } from '@/features/event/types';

type RightPanelProps = {
  recommendedTimes: RecommendedScheduleType[];
  selectedSlotIndex: number | null;
  onSelectSlot: (slot: RecommendedScheduleType, index: number) => void;
};

export default function RightPanel({
  recommendedTimes,
  selectedSlotIndex,
  onSelectSlot,
}: RightPanelProps) {
  const t = useTranslations('event.components.ScheduleConfirmModal');

  return (
    <div className="flex w-full flex-col gap-2 rounded-3xl bg-white p-6 md:min-w-0 md:flex-1">
      <h2 className="text-gray-60 text-md-200">
        {t('selectFromRecommended')}
      </h2>
      <div className="flex max-h-[671px] flex-col gap-2 overflow-y-auto">
        {recommendedTimes.map((recommendedTime, index) => (
          <RecommendedTimeSlotItem
            key={index}
            recommendedTime={recommendedTime}
            isSelected={selectedSlotIndex === index}
            onClick={() => onSelectSlot(recommendedTime, index)}
          />
        ))}
      </div>
    </div>
  );
}
