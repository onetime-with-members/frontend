import { useTranslations } from 'next-intl';

import EventInputLabel from '../EventInputLabel/EventInputLabel';
import TimeDropdown from '@/components/dropdown/TimeDropdown/TimeDropdown';
import { EventType, EventValueType } from '@/lib/types';

interface TimeSectionProps {
  value: EventValueType;
  setValue: React.Dispatch<React.SetStateAction<EventValueType>>;
}

export default function TimeSection({ value, setValue }: TimeSectionProps) {
  const t = useTranslations('eventForm');

  function handleSelectTime(key: keyof EventType) {
    return function (time: string) {
      setValue((prev) => ({
        ...prev,
        [key]: time,
      }));
    };
  }

  return (
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
            setTime={handleSelectTime('start_time')}
          />
          <span className="text-gray-70 text-md-300">-</span>
          <TimeDropdown
            className="w-[7.5rem]"
            time={value.end_time}
            setTime={handleSelectTime('end_time')}
          />
        </div>
      </div>
    </div>
  );
}
