import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import { weekdaysShortKo } from '@/constants';
import { useEventQuery } from '@/features/event/api/event.query';
import { useParams } from 'next/navigation';

export default function ModalConfirmButton({
  calendarEventId,
  onClick,
}: {
  onClick: () => void;
  calendarEventId: string;
}) {
  const params = useParams<{ id: string }>();
  const t = useTranslations('event.components.TalkCalendarSuccessModal');

  const { data: event } = useEventQuery(params.id);

  const dayEventISOString = dayjs(event.confirmation?.start_time, 'HH:mm')
    .day(
      weekdaysShortKo.findIndex(
        (weekday) => weekday === event.confirmation?.start_day,
      ),
    )
    .add(1, 'week')
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
  const calendarEventIdPath =
    event.category === 'DAY'
      ? `${calendarEventId}_${dayEventISOString}`
      : calendarEventId;

  return (
    <a
      href={`https://calendar.kakao.com/schedule/${calendarEventIdPath}`}
      target="_blank"
      role="button"
      className="flex h-14 items-center justify-center rounded-2xl bg-gray-80 text-gray-00 transition-colors duration-150 text-lg-200 hover:bg-gray-90 active:bg-gray-90"
      onClick={onClick}
    >
      {t('confirmButton')}
    </a>
  );
}
