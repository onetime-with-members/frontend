import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import EventInputLabel from '../EventInputLabel';
import CalendarSelect from './CalendarSelect';
import ChipList from './ChipList';
import WeekdaySelect from './WeekdaySelect';
import { PageModeContext } from '@/contexts/page-mode';
import { EventFormContext } from '@/features/event/contexts/EventFormContext';
import cn from '@/lib/cn';

export default function DateControl() {
  const { category, setCategory, ranges, setRanges } =
    useContext(EventFormContext);
  const { pageMode } = useContext(PageModeContext);

  const t = useTranslations('eventForm');

  return (
    <div className="flex flex-col gap-4">
      <EventInputLabel
        labelId="date-range"
        labelText={t('dateRange')}
        description={t('selectDateRange')}
      />
      <div
        className={cn('flex flex-col', {
          'gap-3.5': category === 'DAY',
          'gap-6': category === 'DATE',
        })}
      >
        {pageMode === 'create' && (
          <ChipList
            category={category}
            setCategory={setCategory}
            setRanges={setRanges}
          />
        )}
        {category === 'DAY' ? (
          <WeekdaySelect
            ranges={ranges}
            setRanges={(ranges) => setRanges(ranges)}
          />
        ) : (
          category === 'DATE' && (
            <CalendarSelect
              ranges={ranges}
              setRanges={(ranges) => setRanges(ranges)}
            />
          )
        )}
      </div>
    </div>
  );
}
