import TimeDropdown from '@/components/dropdown/TimeDropdown/TimeDropdown';
import { SleepTimeType } from '@/types/user.type';

interface AccordionContentProps {
  sleepTime: SleepTimeType;
  setSleepTime: React.Dispatch<React.SetStateAction<SleepTimeType>>;
}

export default function AccordionContent({
  sleepTime,
  setSleepTime,
}: AccordionContentProps) {
  function handleSleepTimeChange(key: keyof SleepTimeType, time: string) {
    setSleepTime((prev) => ({
      ...prev,
      [key]: time,
    }));
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
