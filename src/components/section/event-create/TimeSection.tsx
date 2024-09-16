import { EventType } from '../../../types/event.type';
import TimeDropdown from '../../dropdown/TimeDropdown';
import EventInputLabel from '../../input-label/EventInputLabel';

interface TimeSectionProps {
  value: EventType;
  setValue: React.Dispatch<React.SetStateAction<EventType>>;
}

export default function TimeSection({ value, setValue }: TimeSectionProps) {
  function handleSelectAllTime() {
    setValue((prev) => ({
      ...prev,
      start_time: '00:00',
      end_time: '24:00',
    }));
  }

  function handleSelectTime(key: keyof EventType) {
    return function (time: string) {
      setValue((prev) => ({
        ...prev,
        [key]: time,
      }));
    };
  }

  return (
    <div className="flex flex-col gap-4">
      <EventInputLabel
        labelId="time"
        labelText="시간"
        description="설문할 시간의 범위를 설정해주세요."
      />
      <div className="flex gap-4">
        <div className="flex items-center gap-3">
          <TimeDropdown
            className="w-[7.5rem]"
            time={value.start_time}
            setTime={handleSelectTime('start_time')}
          />
          <span className="text-md-300 text-gray-70">~</span>
          <TimeDropdown
            className="w-[7.5rem]"
            time={value.end_time}
            setTime={handleSelectTime('end_time')}
          />
        </div>
        <button
          className="rounded-xl bg-gray-80 px-5 py-4 text-gray-00"
          onClick={handleSelectAllTime}
        >
          종일
        </button>
      </div>
    </div>
  );
}
