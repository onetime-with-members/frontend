import TimeDropdown from '@/components/TimeDropdown';
import { SleepTime } from '@/types/user.type';

interface EditDropdownContentProps {
  sleepTime: SleepTime;
  setSleepTime: React.Dispatch<React.SetStateAction<SleepTime>>;
}

export default function EditDropdownContent({
  sleepTime,
  setSleepTime,
}: EditDropdownContentProps) {
  function handleSleepTimeChange(key: keyof SleepTime, time: string) {
    setSleepTime((prev) => ({
      ...prev,
      [key]: time,
    }));
  }

  return (
    <div className="flex flex-1 items-center gap-2.5">
      <TimeDropdown
        time={sleepTime.sleep_start_time}
        setTime={(time) => handleSleepTimeChange('sleep_start_time', time)}
        className="flex-1"
      />
      <span className="text-gray-40 text-md-300">-</span>
      <TimeDropdown
        time={sleepTime.sleep_end_time}
        setTime={(time) => handleSleepTimeChange('sleep_end_time', time)}
        className="flex-1"
      />
    </div>
  );
}
