'use client';

import { useTranslations } from 'next-intl';

import CalendarSelect from '@/features/event/components/form/EventForm/FormContent/InputContent/DateControl/CalendarSelect';
import { CalendarIcon } from '@/components/icon';
import TimeDropdown from '@/components/TimeDropdown';
import { formatTimeAmPm } from '@/features/event/utils';
import cn from '@/lib/cn';
import { Dayjs } from '@/lib/dayjs';

type LeftPanelProps = {
  eventTitle: string;
  focusedField: 'start' | 'end' | null;
  onFocusChange: (field: 'start' | 'end') => void;
  selectedStartDate: Dayjs | null;
  selectedEndDate: Dayjs | null;
  startTime: string;
  endTime: string;
  calendarRanges: string[];
  onCalendarRangesChange: (ranges: string[]) => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  isConfirmDisabled: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  showCalendarSection?: boolean;
};

export default function LeftPanel({
  eventTitle,
  focusedField,
  onFocusChange,
  selectedStartDate,
  selectedEndDate,
  startTime,
  endTime,
  calendarRanges,
  onCalendarRangesChange,
  onStartTimeChange,
  onEndTimeChange,
  isConfirmDisabled,
  onCancel,
  onConfirm,
  showCalendarSection = true,
}: LeftPanelProps) {
  const t = useTranslations('event.components.ScheduleConfirmModal');

  return (
    <div className="flex w-full flex-col gap-3 md:rounded-3xl bg-white px-4 pt-4 md:p-6 md:w-[442px]">
      <div className="flex flex-col gap-2 md:gap-3 rounded-2xl bg-transparent md:p-0">
        <div className="flex items-center gap-1">
          <CalendarIcon fontSize={20} innerfill="#F6F7F8" />
          <span className="text-gray-70 text-lg-300">{eventTitle}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className={cn(
            'flex flex-col gap-0.5 rounded-xl border bg-gray-00 p-3 text-left transition-colors',
            focusedField === 'start' ? 'border-primary-40' : 'border-gray-10',
          )}
          onClick={() => onFocusChange('start')}
        >
          <span
            className={cn(
              'text-[12px] font-medium',
              focusedField === 'start' ? 'text-primary-40' : 'text-gray-30',
            )}
          >
            {t('start')}
          </span>
          <span
            className={cn(
              'text-md-200',
              focusedField === 'start' ? 'text-primary-40' : 'text-gray-50',
            )}
          >
            {selectedStartDate
              ? `${selectedStartDate.format('YYYY.MM.DD')}. ${selectedStartDate.format('ddd')}`
              : t('selectDateTime')}
          </span>
          <span
            className={cn(
              'text-md-300',
              focusedField === 'start' ? 'text-primary-40' : 'text-gray-50',
            )}
          >
            {startTime ? formatTimeAmPm(startTime) : '-'}
          </span>
        </button>
        <button
          type="button"
          className={cn(
            'flex flex-col gap-0.5 rounded-xl border bg-gray-00 p-3 text-left transition-colors',
            focusedField === 'end' ? 'border-primary-40' : 'border-gray-10',
          )}
          onClick={() => onFocusChange('end')}
        >
          <span
            className={cn(
              'text-[12px] font-medium',
              focusedField === 'end' ? 'text-primary-40' : 'text-gray-30',
            )}
          >
            {t('end')}
          </span>
          <span
            className={cn(
              'text-md-200',
              focusedField === 'end' ? 'text-primary-40' : 'text-gray-50',
            )}
          >
            {selectedEndDate
              ? `${selectedEndDate.format('YYYY.MM.DD')}. ${selectedEndDate.format('ddd')}`
              : t('selectDateTime')}
          </span>
          <span
            className={cn(
              'text-md-300',
              focusedField === 'end' ? 'text-primary-40' : 'text-gray-50',
            )}
          >
            {endTime ? formatTimeAmPm(endTime) : '-'}
          </span>
        </button>
        </div>
      </div>

      {showCalendarSection && (
        <div className="flex flex-col rounded-[20px] shadow-[0_6px_40px_0_rgba(49,51,63,0.20)] md:shadow-none md:border md:border-gray-10 bg-gray-00 p-5">
          <CalendarSelect
            ranges={calendarRanges}
            setRanges={onCalendarRangesChange}
          />
          <TimeDropdown
            time={focusedField === 'start' ? startTime : endTime}
            setTime={
              focusedField === 'start' ? onStartTimeChange : onEndTimeChange
            }
            variant="default"
            displayFormat="12h"
            className="my-5 w-[150px] gap-2 text-gray-70 text-md-200 md:max-w-[150px]"
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
              className="rounded-[10px] bg-primary-40 px-4 py-[6px] text-white text-md-300"
              disabled={isConfirmDisabled}
              onClick={() => {
                if (!isConfirmDisabled) onConfirm();
              }}
            >
              {t('confirm')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
