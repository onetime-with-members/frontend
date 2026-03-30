'use client';

import { useLocale, useTranslations } from 'next-intl';

import EditButton from '../ConfirmedTimeHeader/EditButton';
import KakaoTalkButton from '../ConfirmedTimeHeader/KakaoTalkButton';
import { CalendarIcon } from '@/components/icon';
import { useEventQuery } from '@/features/event/api/event.query';
import { defaultConfirmedTime } from '@/features/event/constants';
import {
  getConfirmedTimeFromNow,
  getConfirmedTimeSummary,
} from '@/features/event/utils';
import { useParams } from 'next/navigation';

export default function ConfirmedTimeMain() {
  const params = useParams<{ id: string }>();
  const t = useTranslations();
  const locale = useLocale();

  const { data: event } = useEventQuery(params.id);

  const confirmedTimeFromNow = getConfirmedTimeFromNow({
    confirmedTime: event.confirmation ?? defaultConfirmedTime,
    category: event.category,
    ongoingText: t('event.pages.EventDetailPage.confirm.ongoing'),
  });
  const confirmedTimeSummary = getConfirmedTimeSummary({
    confirmedTime: event.confirmation ?? defaultConfirmedTime,
    category: event.category,
    locale,
  });

  return (
    <div className="flex flex-col rounded-xl p-1 text-gray-00">
      <div className="flex items-center gap-1">
        <CalendarIcon fontSize={16} innerfill="#1B1C23" />
        <span className="text-sm-200">{confirmedTimeFromNow}</span>
      </div>
      <span className="whitespace-nowrap text-md-300 xs:text-lg-300">
        {confirmedTimeSummary}
      </span>

      <div className="mt-2 flex flex-row gap-2">
        <EditButton />
        <KakaoTalkButton />
      </div>
    </div>
  );
}
