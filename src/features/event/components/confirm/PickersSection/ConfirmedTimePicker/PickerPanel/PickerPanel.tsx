import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import CalendarSelect from '@/components/CalendarSelect';
import TimeDropdown from '@/components/TimeDropdown';
import WeekdaySelect from '@/features/event/components/form/EventForm/FormContent/InputContent/DateControl/WeekdaySelect';
import { SelectedDateTime } from '@/features/event/types';
import useIsMobile from '@/hooks/useIsMobile';
import cn from '@/lib/cn';

export default function PickerPanel({
  type,
  datePickerType,
  onConfirm,
  onCancel,
  selectedDateTime,
  setSelectedDateTime,
}: {
  type: 'start' | 'end';
  datePickerType: 'date' | 'day';
  onConfirm: () => void;
  onCancel: () => void;
  selectedDateTime: SelectedDateTime['start' | 'end'];
  setSelectedDateTime: (dateTime: SelectedDateTime['start' | 'end']) => void;
}) {
  const [currentRanges, setCurrentRanges] = useState(
    selectedDateTime.date ? [selectedDateTime.date] : [],
  );

  const t = useTranslations('event.pages.EventConfirmPage');

  const isMobile = useIsMobile();

  const isDisabled = !selectedDateTime.date || !selectedDateTime.time;

  const setRanges = (ranges: string[]) => {
    const newRanges = ranges.filter((range) => !currentRanges.includes(range));
    setCurrentRanges(newRanges);
    setSelectedDateTime({
      date: newRanges.length > 0 ? newRanges[0] : '',
      time: selectedDateTime.time,
    });
  };

  const content = (
    <div
      className={cn(
        'absolute -bottom-3 flex w-[394px] translate-y-full flex-col gap-5 rounded-[20px] bg-gray-00 p-5 shadow-[0_6px_40px_0_rgba(49,51,63,0.20)] md:static md:bottom-auto md:w-auto md:w-full md:translate-y-0 md:border md:border-gray-10 md:shadow-none',
        {
          'right-0': type === 'end',
        },
      )}
    >
      {datePickerType === 'date' ? (
        <CalendarSelect
          ranges={currentRanges}
          setRanges={setRanges}
          dateRange="all"
        />
      ) : (
        <WeekdaySelect ranges={currentRanges} setRanges={setRanges} />
      )}
      <TimeDropdown
        time={selectedDateTime.time}
        setTime={(time: string) =>
          setSelectedDateTime({
            date: selectedDateTime.date,
            time,
          })
        }
        variant="default"
        displayFormat="12h"
        className="w-[9rem]"
        placement="top"
        interval="30m"
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

  return isMobile
    ? content
    : createPortal(content, document.getElementById('desktop-picker-panel')!);
}
