import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { SelectedDateTimeContext } from '@/features/event/contexts/SelectedDateTimeContext';
import cn from '@/lib/cn';
import dayjs from '@/lib/dayjs';
import { formatTimeAmPm } from '@/utils';

export default function PickerTrigger({
  type,
  active,
  onClick,
}: {
  type: 'start' | 'end';
  active?: boolean;
  onClick: () => void;
}) {
  const { selectedDateTime } = useContext(SelectedDateTimeContext);

  const t = useTranslations('event.pages.EventConfirmPage');

  return (
    <button
      type="button"
      className={cn(
        'flex w-full flex-col gap-0.5 rounded-xl border border-gray-10 bg-gray-00 p-3 text-left text-gray-50 transition-colors',
        {
          'border-primary-40 text-primary-40': active,
        },
      )}
      onClick={onClick}
    >
      <span
        className={cn('text-[12px] font-medium', {
          'text-gray-30': !active,
        })}
      >
        {type === 'start' ? t('start') : t('end')}
      </span>
      <span className="text-md-200">
        {selectedDateTime[type].date
          ? dayjs(selectedDateTime[type].date, 'YYYY.MM.DD').format(
              'YYYY.MM.DD dd',
            )
          : t('selectDateTime')}
      </span>
      <span className="text-md-300">
        {selectedDateTime[type].time
          ? formatTimeAmPm(selectedDateTime[type].time)
          : '-'}
      </span>
    </button>
  );
}
