import { useTranslations } from 'next-intl';

import RecommendedTimeSlotItem from '../RecommendedTimeSlotItem';
import { RecommendedScheduleType } from '@/features/event/types';
import { IconChevronDown } from '@tabler/icons-react';

export default function RecommendedTimesSection({
  recommendedTimes,
  selectedSlotIndex,
  onSelectSlot,
}: {
  recommendedTimes: RecommendedScheduleType[];
  selectedSlotIndex: number | null;
  onSelectSlot: (slot: RecommendedScheduleType, index: number) => void;
}) {
  const t = useTranslations('event.pages.EventConfirmPage');

  return (
    <section className="flex w-full flex-col gap-2 bg-white px-4 md:min-w-0 md:flex-1 md:rounded-3xl md:p-6">
      <h2 className="text-gray-60 text-md-200">{t('selectFromRecommended')}</h2>
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
      <button
        type="button"
        className="flex items-center justify-center gap-1 py-3 text-gray-40 text-sm-200 md:hidden"
      >
        {t('viewMore')}
        <IconChevronDown size={16} />
      </button>
    </section>
  );
}
