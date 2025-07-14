import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
} from 'react-hook-form';

import { CalendarSelect, WeekdaySelect } from './select';
import TimeDropdown from '@/components/dropdown/time-dropdown';
import Input from '@/components/input';
import { PageModeContext } from '@/contexts/page-mode';
import cn from '@/lib/cn';
import { EventFormType } from '@/lib/validation/form-types';

export default function InputContent({
  value,
  register,
  setValue,
  control,
}: {
  value: EventFormType;
  register: UseFormRegister<EventFormType>;
  setValue: UseFormSetValue<EventFormType>;
  control: Control<EventFormType>;
}) {
  const { replace: setRanges } = useFieldArray<EventFormType>({
    control,
    name: 'ranges' as never,
  });

  const t = useTranslations('eventForm');

  const { pageMode } = useContext(PageModeContext);

  return (
    <div className="flex w-full flex-col justify-center gap-10 rounded-3xl bg-gray-00 px-4 py-6 md:flex-row md:px-6">
      <div className="flex flex-1 flex-col gap-10">
        {/* Title */}
        <div className="flex flex-col gap-2 md:gap-4">
          <EventInputLabel
            labelId="title"
            labelText={t('eventName')}
            description={t('max50Characters')}
          />
          <Input
            {...register('title')}
            id="title"
            placeholder={t('enterEventName')}
          />
        </div>

        {/* Time */}
        <div className="flex flex-col gap-2 md:gap-4">
          <EventInputLabel
            labelId="time"
            labelText={t('timeRange')}
            description={t('selectTimeRange')}
          />
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <TimeDropdown
                className="w-[7.5rem]"
                time={value.start_time}
                setTime={(time: string) => setValue('start_time', time)}
              />
              <span className="text-gray-70 text-md-300">-</span>
              <TimeDropdown
                className="w-[7.5rem]"
                time={value.end_time}
                setTime={(time: string) => setValue('end_time', time)}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* Date */}
        <div className="flex flex-col gap-4">
          <EventInputLabel
            labelId="date-range"
            labelText={t('dateRange')}
            description={t('selectDateRange')}
          />
          <div
            className={cn('flex flex-col', {
              'gap-3.5': value.category === 'DAY',
              'gap-6': value.category === 'DATE',
            })}
          >
            {pageMode === 'create' && (
              <div className="flex gap-2">
                <Chip
                  type="button"
                  active={value.category === 'DATE'}
                  onClick={() => {
                    setValue('category', 'DATE');
                    setRanges([]);
                  }}
                >
                  {t('date')}
                </Chip>
                <Chip
                  type="button"
                  active={value.category === 'DAY'}
                  onClick={() => {
                    setValue('category', 'DAY');
                    setRanges([]);
                  }}
                >
                  {t('weekday')}
                </Chip>
              </div>
            )}
            {value.category === 'DAY' ? (
              <WeekdaySelect
                ranges={value.ranges}
                setRanges={(ranges) => setRanges(ranges)}
              />
            ) : (
              value.category === 'DATE' && (
                <CalendarSelect
                  ranges={value.ranges}
                  setRanges={(ranges) => setRanges(ranges)}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EventInputLabel({
  labelId,
  labelText,
  description,
}: {
  labelId: string;
  labelText: string;
  description: string;
}) {
  return (
    <div className="space-x-2">
      <label htmlFor={labelId} className="align-baseline text-lg-200">
        {labelText}
      </label>
      <span className="align-baseline text-gray-40 text-sm-200">
        {description}
      </span>
    </div>
  );
}

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Chip({ children, active, className, ...rest }: ChipProps) {
  return (
    <button
      className={cn(
        'rounded-full bg-gray-05 px-6 py-1 text-gray-40 text-md-200',
        {
          'bg-primary-40 text-gray-00': active,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
