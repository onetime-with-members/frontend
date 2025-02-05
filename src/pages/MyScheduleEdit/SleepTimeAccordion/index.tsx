import AccordionContent from './AccordionContent';
import AccordionMain from './AccordionMain';
import { SleepTime } from '@/types/user.type';

interface SleepTimeUIProps {
  sleepTime: SleepTime;
  setSleepTime: React.Dispatch<React.SetStateAction<SleepTime>>;
  isAccordionOpen: boolean;
  setIsAccordionOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SleepTimeAccordion({
  sleepTime,
  setSleepTime,
  isAccordionOpen,
  setIsAccordionOpen,
}: SleepTimeUIProps) {
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
