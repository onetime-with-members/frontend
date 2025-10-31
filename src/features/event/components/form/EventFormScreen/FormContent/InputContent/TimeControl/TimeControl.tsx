import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import EventInputLabel from '../EventInputLabel';
import TimeDropdown from '@/components/dropdown/TimeDropdown';
import { EventFormContext } from '@/features/event/contexts/EventFormContext';

export default function TimeControl() {
  const { startTime, setStartTime, endTime, setEndTime } =
    useContext(EventFormContext);

  const t = useTranslations('eventForm');

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
            time={startTime}
            setTime={setStartTime}
          />
          <span className="text-gray-70 text-md-300">-</span>
          <TimeDropdown
            className="w-[7.5rem]"
            time={endTime}
            setTime={setEndTime}
          />
        </div>
      </div>
    </div>
  );
}
