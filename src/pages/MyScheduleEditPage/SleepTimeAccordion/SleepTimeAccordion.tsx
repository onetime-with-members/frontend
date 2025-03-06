import AccordionContent from './AccordionContent/AccordionContent';
import AccordionMain from './AccordionMain/AccordionMain';
import { SleepTimeType } from '@/types/user.type';

interface SleepTimeUIProps {
  sleepTime: SleepTimeType;
  setSleepTime: React.Dispatch<React.SetStateAction<SleepTimeType>>;
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
    <div className="sticky top-[120px] z-20 flex flex-col gap-3 bg-gray-05 px-5 py-4">
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
