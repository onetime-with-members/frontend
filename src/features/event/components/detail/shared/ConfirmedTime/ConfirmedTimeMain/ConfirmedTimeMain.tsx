import { useLocale, useTranslations } from 'next-intl';

import { CalendarIcon } from '@/components/icon';
import { useEventQuery } from '@/features/event/api/event.query';
import { defaultConfirmedTime } from '@/features/event/constants';
import {
  getConfirmedTimeFromNow,
  getConfirmedTimeText,
} from '@/features/event/utils';
import dayjs from '@/lib/dayjs';
import { useParams } from 'next/navigation';

dayjs.locale('ko-custom', {
  ...dayjs.Ls.ko, // 기존 한국어 설정 복사
  name: 'ko-custom',
  weekdaysShort: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
});

export default function ConfirmedTimeMain() {
  const params = useParams<{ id: string }>();
  const t = useTranslations();
  const locale = useLocale() as 'ko' | 'en';

  const { data: event } = useEventQuery(params.id);

  const confirmedTimeText = getConfirmedTimeText({
    confirmedTime: event.confirmation ?? defaultConfirmedTime,
    category: event.category,
    locale,
  });
  const confirmedTimeFromNow = getConfirmedTimeFromNow({
    confirmedTime: event.confirmation ?? defaultConfirmedTime,
    category: event.category,
    ongoingText: t('confirm.ongoing'),
  });

  return (
    <div className="flex flex-col items-start rounded-xl bg-gray-60 px-3 py-2 text-gray-00">
      <div className="flex flex-row items-center gap-1">
        <CalendarIcon fontSize={16} innerfill="#5D6279" />
        <span className="text-sm-300">{confirmedTimeFromNow}</span>
      </div>
      <span className="whitespace-nowrap text-md-300 xs:text-lg-300">
        {confirmedTimeText}
      </span>
    </div>
  );
}
