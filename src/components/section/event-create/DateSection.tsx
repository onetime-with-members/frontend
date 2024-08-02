import { useState } from 'react';

import Chip from '../../Chip';
import EventInputLabel from '../../input-label/EventInputLabel';
import CalendarSelect from '../../select/CalendarSelect';
import WeekdaySelect from '../../select/WeekdaySelect';

export default function DateSection() {
  const [selectedChip, setSelectedChip] = useState<'WEEKDAY' | 'CALENDAR'>(
    'WEEKDAY',
  );
  const [selectedDateList, setSelectedDateList] = useState<string[]>([]);

  function handleSelectChip(chip: 'WEEKDAY' | 'CALENDAR') {
    setSelectedChip(chip);
  }

  function selectDate(date: string) {
    setSelectedDateList((prev) => {
      const index = prev.indexOf(date);
      if (index === -1) {
        return [...prev, date].sort();
      }
      return prev.filter((prevDate) => prevDate !== date);
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <EventInputLabel
        labelId="date-range"
        labelText="설문 범위"
        description="설문할 날짜의 범위를 설정해주세요."
      />
      <div className="flex flex-col">
        <div className="flex gap-2">
          <Chip
            active={selectedChip === 'WEEKDAY'}
            onClick={() => handleSelectChip('WEEKDAY')}
          >
            요일
          </Chip>
          <Chip
            active={selectedChip === 'CALENDAR'}
            onClick={() => handleSelectChip('CALENDAR')}
          >
            날짜
          </Chip>
        </div>
        {selectedChip === 'WEEKDAY' ? (
          <WeekdaySelect
            className="mt-3.5"
            selectedDateList={selectedDateList}
            selectDate={selectDate}
          />
        ) : (
          selectedChip === 'CALENDAR' && (
            <CalendarSelect
              className="mt-6"
              selectedDateList={selectedDateList}
              selectDate={selectDate}
            />
          )
        )}
      </div>
    </div>
  );
}
