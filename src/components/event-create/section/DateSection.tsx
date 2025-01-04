import { EventValue } from '../../../types/event.type';
import Chip from '../../Chip';
import EventInputLabel from '../EventInputLabel';
import CalendarSelect from '../select/date-group/CalendarSelect';
import WeekdaySelect from '../select/date-group/WeekdaySelect';

interface DateSectionProps {
  value: EventValue;
  setValue: React.Dispatch<React.SetStateAction<EventValue>>;
}

export default function DateSection({ value, setValue }: DateSectionProps) {
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
      <div className="flex flex-col">
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
        {value.category === 'DAY' ? (
          <WeekdaySelect className="mt-3.5" value={value} setValue={setValue} />
        ) : (
          value.category === 'DATE' && (
            <CalendarSelect
              className="mt-6"
              value={value}
              setValue={setValue}
            />
          )
        )}
      </div>
    </div>
  );
}
