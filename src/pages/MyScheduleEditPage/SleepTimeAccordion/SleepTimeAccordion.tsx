import AccordionContent from './AccordionContent/AccordionContent';
import AccordionMain from './AccordionMain/AccordionMain';

interface SleepTimeUIProps {
  isAccordionOpen: boolean;
  setIsAccordionOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SleepTimeAccordion({
  isAccordionOpen,
  setIsAccordionOpen,
}: SleepTimeUIProps) {
  return (
    <div className="sticky top-[64px] z-20 flex flex-col gap-3 bg-gray-05 px-5 py-4">
      <AccordionMain
        isAccordionOpen={isAccordionOpen}
        setIsAccordionOpen={setIsAccordionOpen}
      />
      {isAccordionOpen && <AccordionContent />}
    </div>
  );
}
