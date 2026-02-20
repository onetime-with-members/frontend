import { useLocale, useTranslations } from 'next-intl';

import SpeechBalloon from '../../../../shared/SpeechBalloon';
import { CalendarIcon } from '@/components/icon';
import { weekdaysShortKo } from '@/constants';
import {
  useConfirmEventMutation,
  useEventQuery,
  useRecommendedTimesQuery,
} from '@/features/event/api/event.query';
import dayjs from '@/lib/dayjs';
import { useParams } from 'next/navigation';

export default function ConfirmEventButton() {
  const params = useParams<{ id: string }>();
  const t = useTranslations('confirm');
  const locale = useLocale();

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
              end_date: dayjs(recommendedTime.time_point, 'YYYY.MM.DD')
                .add(1, 'day')
                .format('YYYY.MM.DD'),
              start_time: recommendedTime.start_time,
              end_time: recommendedTime.end_time,
              selection_source: 'RECOMMENDED',
            }
          : {
              start_day: recommendedTime.time_point,
              end_day:
                weekdaysShortKo[
                  weekdaysShortKo.findIndex(
                    (weekday) => weekday === recommendedTime.time_point,
                  ) + 1
                ],
              start_time: recommendedTime.start_time,
              end_time: recommendedTime.end_time,
              selection_source: 'RECOMMENDED',
            },
    });
  }

  return (
    <div className="hidden md:block">
      <SpeechBalloon.Container>
        <SpeechBalloon.Wrapper>
          <button
            className="flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-gray-00 text-md-300"
            onClick={handleClick}
          >
            <span>
              <CalendarIcon innerfill="#4c65e5" fontSize={24} />
            </span>
            <span>{t('button')}</span>
          </button>
        </SpeechBalloon.Wrapper>
        <SpeechBalloon.Main
          width={locale === 'ko' ? 315 : 405}
          offset={2}
          vertical="bottom"
          horizontal="right"
          variant="secondary"
          triangleOffset={70}
        >
          {t('speechBalloon')}
        </SpeechBalloon.Main>
      </SpeechBalloon.Container>
    </div>
  );
}
