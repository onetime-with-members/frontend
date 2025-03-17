import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import EventInputLabel from '../EventInputLabel/EventInputLabel';
import CalendarSelect from './CalendarSelect/CalendarSelect';
import Chip from './Chip/Chip';
import WeekdaySelect from './WeekdaySelect/WeekdaySelect';
import { PageModeContext } from '@/contexts/PageModeContext';
import { EventValueType } from '@/types/event.type';
import cn from '@/utils/cn';

interface DateSectionProps {
  value: EventValueType;
  setValue: React.Dispatch<React.SetStateAction<EventValueType>>;
}

export default function DateSection({ value, setValue }: DateSectionProps) {
  const { pageMode } = useContext(PageModeContext);

  const t = useTranslations('eventForm');

  function handleSelectChip(chip: 'DATE' | 'DAY') {
    setValue((prev) => ({
      ...prev,
      category: chip,
      ranges: [],
    }));
  }

  return (
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
              active={value.category === 'DATE'}
              onClick={() => handleSelectChip('DATE')}
            >
              {t('date')}
            </Chip>
            <Chip
              active={value.category === 'DAY'}
              onClick={() => handleSelectChip('DAY')}
            >
              {t('weekday')}
            </Chip>
          </div>
        )}
        {value.category === 'DAY' ? (
          <WeekdaySelect value={value} setValue={setValue} />
        ) : (
          value.category === 'DATE' && (
            <CalendarSelect value={value} setValue={setValue} />
          )
        )}
      </div>
    </div>
  );
}
