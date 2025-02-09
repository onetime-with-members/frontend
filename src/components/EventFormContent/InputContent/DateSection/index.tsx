import { useContext } from 'react';

import EventInputLabel from '../EventInputLabel';
import CalendarSelect from './CalendarSelect';
import Chip from './Chip';
import WeekdaySelect from './WeekdaySelect';
import { PageModeContext } from '@/contexts/PageModeContext';
import { EventValueType } from '@/types/event.type';
import cn from '@/utils/cn';

interface DateSectionProps {
  value: EventValueType;
  setValue: React.Dispatch<React.SetStateAction<EventValueType>>;
}

export default function DateSection({ value, setValue }: DateSectionProps) {
  const { pageMode } = useContext(PageModeContext);

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
        labelText="설문 범위"
        description="설문할 날짜의 범위를 설정해주세요."
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
              날짜
            </Chip>
            <Chip
              active={value.category === 'DAY'}
              onClick={() => handleSelectChip('DAY')}
            >
              요일
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
