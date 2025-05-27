import TimeDropdown from '@/components/dropdown/TimeDropdown/TimeDropdown';
import { SleepTimeType } from '@/lib/types';

interface AccordionContentProps {
  sleepTime: SleepTimeType;
  setSleepTime: (sleepTime: SleepTimeType) => void;
}

export default function AccordionContent({
  sleepTime,
  setSleepTime,
}: AccordionContentProps) {
  function handleSleepTimeChange(key: keyof SleepTimeType, time: string) {
    setSleepTime({
      ...sleepTime,
      [key]: time,
    });
  }

  return (
    <div className="flex items-center gap-4">
      <TimeDropdown
        variant="white"
        time={sleepTime.sleep_start_time}
        setTime={(time) => handleSleepTimeChange('sleep_start_time', time)}
        className="flex-1"
      />
      <span className="text-gray-40 text-md-300">-</span>
      <TimeDropdown
        variant="white"
        time={sleepTime.sleep_end_time}
        setTime={(time) => handleSleepTimeChange('sleep_end_time', time)}
        className="flex-1"
      />
    </div>
  );
}
