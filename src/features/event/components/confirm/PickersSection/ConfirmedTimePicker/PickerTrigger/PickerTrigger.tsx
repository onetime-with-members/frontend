import { useTranslations } from 'next-intl';

import { weekdaysShortKo } from '@/constants';
import { SelectedDateTime } from '@/features/event/types';
import cn from '@/lib/cn';
import dayjs from '@/lib/dayjs';
import { formatTimeAmPm } from '@/utils';

export default function PickerTrigger({
  type,
  datePickerType,
  active,
  onClick,
  selectedDateTime,
}: {
  type: 'start' | 'end';
  datePickerType: 'date' | 'day';
  active?: boolean;
  onClick: () => void;
  selectedDateTime: SelectedDateTime['start' | 'end'];
}) {
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
        {selectedDateTime.date
          ? datePickerType === 'date'
            ? dayjs(selectedDateTime.date, 'YYYY.MM.DD').format(
                'YYYY.MM.DD ddd',
              )
            : dayjs()
                .day(
                  weekdaysShortKo.findIndex(
                    (weekday) => weekday === selectedDateTime.date,
                  ),
                )
                .format('dddd')
          : t('selectDateTime')}
      </span>
      <span className="text-md-300">
        {selectedDateTime.time ? formatTimeAmPm(selectedDateTime.time) : '-'}
      </span>
    </button>
  );
}
