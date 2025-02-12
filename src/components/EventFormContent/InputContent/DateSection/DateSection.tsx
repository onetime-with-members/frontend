import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EventInputLabel from '../EventInputLabel/EventInputLabel';
import CalendarSelect from './CalendarSelect/CalendarSelect';
import Chip from './Chip/Chip';
import WeekdaySelect from './WeekdaySelect/WeekdaySelect';
import { PageModeContext } from '@/contexts/PageModeContext';
import { AppDispatch, RootState } from '@/store';
import { changeEvent } from '@/store/eventSlice';
import cn from '@/utils/cn';

export default function DateSection() {
  const { eventValue } = useSelector((state: RootState) => state.event);
  const dispatch = useDispatch<AppDispatch>();

  const { pageMode } = useContext(PageModeContext);

  function handleSelectChip(chip: 'DATE' | 'DAY') {
    dispatch(changeEvent({ ...eventValue, ranges: [], category: chip }));
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
          'gap-3.5': eventValue.category === 'DAY',
          'gap-6': eventValue.category === 'DATE',
        })}
      >
        {pageMode === 'create' && (
          <div className="flex gap-2">
            <Chip
              active={eventValue.category === 'DATE'}
              onClick={() => handleSelectChip('DATE')}
            >
              날짜
            </Chip>
            <Chip
              active={eventValue.category === 'DAY'}
              onClick={() => handleSelectChip('DAY')}
            >
              요일
            </Chip>
          </div>
        )}
        {eventValue.category === 'DAY' ? (
          <WeekdaySelect />
        ) : (
          eventValue.category === 'DATE' && <CalendarSelect />
        )}
      </div>
    </div>
  );
}
