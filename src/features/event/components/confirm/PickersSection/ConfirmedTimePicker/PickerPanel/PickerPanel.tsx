import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';

import CalendarSelect from '@/components/CalendarSelect';
import TimeDropdown from '@/components/TimeDropdown';
import { SelectedDateTimeContext } from '@/features/event/contexts/SelectedDateTimeContext';
import cn from '@/lib/cn';

export default function PickerPanel({
  type,
  onConfirm,
  onCancel,
}: {
  type: 'start' | 'end';
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const { selectedDateTime, setSelectedDateTime } = useContext(
    SelectedDateTimeContext,
  );

  const [currentRanges, setCurrentRanges] = useState(
    selectedDateTime[type].date ? [selectedDateTime[type].date] : [],
  );

  const t = useTranslations('event.pages.EventConfirmPage');

  const isDisabled =
    !selectedDateTime[type].date || !selectedDateTime[type].time;

  const setRanges = (ranges: string[]) => {
    const newRanges = ranges.filter((range) => !currentRanges.includes(range));
    setCurrentRanges(newRanges);
    setSelectedDateTime({
      ...selectedDateTime,
      [type]: {
        date: newRanges.length > 0 ? newRanges[0] : '',
        time: selectedDateTime[type].time,
      },
    });
  };

  return (
    <div
      className={cn(
        'absolute -bottom-3 flex w-[394px] translate-y-full flex-col gap-5 rounded-[20px] bg-gray-00 p-5 shadow-[0_6px_40px_0_rgba(49,51,63,0.20)] md:border md:border-gray-10 md:shadow-none',
        {
          'right-0': type === 'end',
        },
      )}
    >
      <CalendarSelect ranges={currentRanges} setRanges={setRanges} />
      <TimeDropdown
        time={selectedDateTime[type].time}
        setTime={(time: string) =>
          setSelectedDateTime({
            ...selectedDateTime,
            [type]: {
              date: selectedDateTime[type].date,
              time,
            },
          })
        }
        variant="default"
        displayFormat="12h"
        className="w-[9rem]"
        placement="top"
      />
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          className="rounded-[10px] border border-gray-10 bg-gray-00 px-4 text-gray-40 text-md-300"
          onClick={onCancel}
        >
          {t('cancel')}
        </button>
        <button
          type="button"
          className="rounded-[10px] border border-primary-40 bg-primary-40 px-4 py-[6px] text-white text-md-300 disabled:border-gray-10 disabled:bg-gray-05 disabled:text-gray-40"
          disabled={isDisabled}
          onClick={onConfirm}
        >
          {t('confirm')}
        </button>
      </div>
    </div>
  );
}
