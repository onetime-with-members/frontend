import { useTranslations } from 'next-intl';
import { useState } from 'react';

import RecommendedTimeItem from './RecommendedTimeItem';
import { useRecommendedTimesQuery } from '@/features/event/api/event.query';
import { SelectedDateTime } from '@/features/event/types';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useParams } from 'next/navigation';

export default function RecommendedTimesSection({
  setFinalDateTime,
}: {
  setFinalDateTime: (dateTime: SelectedDateTime) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null,
  );

  const params = useParams<{ id: string }>();
  const t = useTranslations('event.pages.EventConfirmPage');

  const { data: recommendedTimesData } = useRecommendedTimesQuery(params.id);

  const recommendedTimes = isExpanded
    ? recommendedTimesData
    : recommendedTimesData.slice(0, 3);

  function handleToggle() {
    setIsExpanded((prev) => !prev);
  }

  function handleItemClick(index: number) {
    setSelectedItemIndex(index);

    const { time_point, start_time, end_time } = recommendedTimesData[index];
    const result = {
      start: {
        date: time_point,
        time: start_time,
      },
      end: {
        date: time_point,
        time: end_time,
      },
    };

    setFinalDateTime(result);
  }

  return (
    <section className="flex w-full flex-col gap-2 bg-white px-4 md:min-w-0 md:flex-1 md:rounded-3xl md:p-6">
      <h2 className="text-gray-60 text-md-200">{t('selectFromRecommended')}</h2>
      <ul className="flex flex-col gap-2 overflow-y-auto">
        {recommendedTimes.map((recommendedTime, index) => (
          <RecommendedTimeItem
            key={index}
            recommendedTime={recommendedTime}
            isSelected={selectedItemIndex === index}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </ul>
      <button
        type="button"
        className="flex items-center justify-center gap-1 py-3 text-gray-40 text-sm-200"
        onClick={handleToggle}
      >
        <span>{isExpanded ? t('viewLess') : t('viewMore')}</span>
        {isExpanded ? (
          <IconChevronUp size={16} />
        ) : (
          <IconChevronDown size={16} />
        )}
      </button>
    </section>
  );
}
