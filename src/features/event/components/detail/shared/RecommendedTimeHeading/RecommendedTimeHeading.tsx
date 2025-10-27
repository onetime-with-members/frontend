import dayjs from 'dayjs';
import { useLocale } from 'next-intl';

import { useEventQuery } from '@/features/event/api/events.query';
import { RecommendScheduleType } from '@/features/event/models';
import { weekdaysShortKo } from '@/lib/constants';
import { useParams } from 'next/navigation';

export default function RecommendedTimeHeading({
  recommendedTime,
}: {
  recommendedTime: RecommendScheduleType;
}) {
  const params = useParams<{ id: string }>();
  const locale = useLocale();

  const { data: event } = useEventQuery(params.id);

  return (
    <div className="flex flex-col text-gray-60">
      <h2 className="text-sm-200">
        {event && event.category === 'DATE'
          ? dayjs(recommendedTime.time_point, 'YYYY.MM.DD').format(
              locale === 'ko' ? 'M월 D일 dddd' : 'ddd, MMMM Do',
            )
          : dayjs()
              .day(
                weekdaysShortKo.findIndex(
                  (weekday) => weekday === recommendedTime.time_point,
                ),
              )
              .format('dddd')}
      </h2>
      <h3 className="text-lg-300">
        {recommendedTime.start_time} - {recommendedTime.end_time}
      </h3>
    </div>
  );
}
