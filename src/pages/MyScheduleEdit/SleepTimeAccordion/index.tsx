import { useState } from 'react';

import AccordionContent from './AccordionContent';
import AccordionMain from './AccordionMain';

interface SleepTimeUIProps {
  isAccordionOpen: boolean;
  setIsAccordionOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type SleepTime = {
  start: string;
  end: string;
};

export default function SleepTimeAccordion({
  isAccordionOpen,
  setIsAccordionOpen,
}: SleepTimeUIProps) {
  const [sleepTime, setSleepTime] = useState<SleepTime>({
    start: '03:00',
    end: '10:00',
  });

  return (
    <div className="sticky top-[64px] z-20 flex flex-col gap-3 bg-gray-05 px-5 py-4">
      <AccordionMain
        isAccordionOpen={isAccordionOpen}
        setIsAccordionOpen={setIsAccordionOpen}
      />
      {isAccordionOpen && (
        <AccordionContent sleepTime={sleepTime} setSleepTime={setSleepTime} />
      )}
    </div>
  );
}
