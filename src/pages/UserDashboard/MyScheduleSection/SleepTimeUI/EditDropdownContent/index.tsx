import { SleepTime } from '..';

import TimeDropdown from '@/components/TimeDropdown';

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
    <div className="flex items-center gap-2.5">
      <TimeDropdown
        time={sleepTime.start}
        setTime={(time) => handleSleepTimeChange('start', time)}
      />
      <span className="text-gray-40 text-md-300">-</span>
      <TimeDropdown
        time={sleepTime.end}
        setTime={(time) => handleSleepTimeChange('end', time)}
      />
    </div>
  );
}
