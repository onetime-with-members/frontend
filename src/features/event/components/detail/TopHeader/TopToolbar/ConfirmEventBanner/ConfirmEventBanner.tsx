import { useTranslations } from 'next-intl';

import { CalendarIcon } from '@/components/icon';
import {
  useConfirmEventMutation,
  useEventQuery,
  useRecommendedTimesQuery,
} from '@/features/event/api/event.query';
import { IconChevronRight } from '@tabler/icons-react';
import { useParams } from 'next/navigation';

export default function ConfirmEventBanner() {
  const params = useParams<{ id: string }>();
  const t = useTranslations('confirm');

  const { data: event } = useEventQuery(params.id);
  const { data: recommendedTimes } = useRecommendedTimesQuery(params.id);

  const { mutateAsync: confirmEvent } = useConfirmEventMutation();

  async function handleClick() {
    if (recommendedTimes.length === 0) return;
    const recommendedTime = recommendedTimes[0];
    await confirmEvent({
      eventId: params.id,
      data:
        event.category === 'DATE'
          ? {
              start_date: recommendedTime.time_point,
              end_date: recommendedTime.time_point,
              start_time: recommendedTime.start_time,
              end_time: recommendedTime.end_time,
              selection_source: 'RECOMMENDED',
            }
          : {
              start_day: recommendedTime.time_point,
              end_day: recommendedTime.time_point,
              start_time: recommendedTime.start_time,
              end_time: recommendedTime.end_time,
              selection_source: 'RECOMMENDED',
            },
    });
  }

  return (
    <div
      className="flex cursor-pointer items-center gap-1.5 rounded-2xl bg-gray-70 px-4 py-3 text-gray-30"
      onClick={handleClick}
    >
      <span>
        <CalendarIcon innerfill="#474a5c" fontSize={20} />
      </span>
      <span className="flex-1 text-md-200">{t('banner')}</span>
      <span>
        <IconChevronRight size={24} />
      </span>
    </div>
  );
}
