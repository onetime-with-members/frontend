'use client';

import { useLocale, useTranslations } from 'next-intl';

import { CalendarIcon } from '@/components/icon';
import { useEventQuery } from '@/features/event/api/event.query';
import { defaultConfirmedTime } from '@/features/event/constants';
import {
  getConfirmedTimeFromNow,
  getConfirmedTimeMainLineText,
} from '@/features/event/utils';
import { useParams } from 'next/navigation';
import type { ConfirmedTimeVariant } from '../confirmedTimeVariant';
import EditButton from '../ConfirmedTimeHeader/EditButton';
import KakaoTalkButton from '../ConfirmedTimeHeader/KakaoTalkButton';
import cn from '@/lib/cn';

export default function ConfirmedTimeMain({
  variant = 'default',
}: {
  variant?: ConfirmedTimeVariant;
}) {
  const params = useParams<{ id: string }>();
  const t = useTranslations();
  const locale = useLocale();

  const { data: event } = useEventQuery(params.id);

  const confirmedTimeFromNow = getConfirmedTimeFromNow({
    confirmedTime: event.confirmation ?? defaultConfirmedTime,
    category: event.category,
    ongoingText: t('event.pages.EventDetailPage.confirm.ongoing'),
  });
  const confirmedTimeMainLine = getConfirmedTimeMainLineText({
    confirmedTime: event.confirmation ?? defaultConfirmedTime,
    category: event.category,
    locale,
  });

  const isHeaderCard = variant === 'headerCard';

  return (
    <div
      className={cn(
        'flex flex-col rounded-xl p-1',
        isHeaderCard ? 'text-gray-90' : 'text-gray-00',
      )}
    >
      <div className="flex items-center gap-1">
        <CalendarIcon
          fontSize={16}
          innerfill={isHeaderCard ? '#474A5C' : '#1B1C23'}
        />
        <span className="text-sm-200">{confirmedTimeFromNow}</span>
      </div>
      <span className="whitespace-nowrap text-md-300 xs:text-lg-300">
        {confirmedTimeMainLine}
      </span>

      <div className="flex flex-row mt-2 gap-2">
        <EditButton />
        <KakaoTalkButton />
      </div>
    </div>
  );
}
