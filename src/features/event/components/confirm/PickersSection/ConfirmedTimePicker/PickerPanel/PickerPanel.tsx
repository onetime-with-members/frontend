import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import TimeDropdown from '@/components/TimeDropdown';
import CalendarSelect from '@/features/event/components/form/EventForm/FormContent/InputContent/DateControl/CalendarSelect';
import cn from '@/lib/cn';

export default function PickerPanel({
  type,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  onConfirm,
  onCancel,
}: {
  type: 'start' | 'end';
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [currentRanges, setCurrentRanges] = useState<string[]>(
    selectedDate ? [selectedDate] : [],
  );

  const t = useTranslations('event.pages.EventConfirmPage');

  const isDisabled = !selectedDate || !selectedTime;

  const setRanges = (ranges: string[]) => {
    setCurrentRanges((prev) => ranges.filter((range) => !prev.includes(range)));
  };

  useEffect(() => {
    setSelectedDate(currentRanges.length > 0 ? currentRanges[0] : '');
  }, [currentRanges]);

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
        time={selectedTime}
        setTime={setSelectedTime}
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
