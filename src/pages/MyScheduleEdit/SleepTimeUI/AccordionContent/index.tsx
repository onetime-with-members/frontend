import { SleepTime } from '..';

import TimeDropdown from '@/components/TimeDropdown';

interface AccordionContentProps {
  sleepTime: { start: string; end: string };
  setSleepTime: React.Dispatch<React.SetStateAction<SleepTime>>;
}

export default function AccordionContent({
  sleepTime,
  setSleepTime,
}: AccordionContentProps) {
  function handleSleepTimeChange(key: keyof SleepTime, time: string) {
    setSleepTime((prev) => ({
      ...prev,
      [key]: time,
    }));
  }

  return (
    <div
      className="flex items-center gap-2.5"
      onClick={(e) => e.stopPropagation()}
    >
      <TimeDropdown
        variant="white"
        time={sleepTime.start}
        setTime={(time) => handleSleepTimeChange('start', time)}
        className="flex-1"
      />
      <span className="text-gray-40 text-md-300">-</span>
      <TimeDropdown
        variant="white"
        time={sleepTime.end}
        setTime={(time) => handleSleepTimeChange('end', time)}
        className="flex-1"
      />
    </div>
  );
}
