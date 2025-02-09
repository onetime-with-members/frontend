import SleepIcon from '@/components/icon/SleepIcon';
import cn from '@/utils/cn';
import { IconChevronDown } from '@tabler/icons-react';

interface AccordionMainProps {
  isAccordionOpen: boolean;
  setIsAccordionOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AccordionMain({
  isAccordionOpen,
  setIsAccordionOpen,
}: AccordionMainProps) {
  function handleAccordionClick() {
    setIsAccordionOpen((prev) => !prev);
  }

  return (
    <div
      className="flex cursor-pointer items-center justify-between"
      onClick={handleAccordionClick}
    >
      <div className="flex items-center gap-1.5">
        <span>
          <SleepIcon fill="#5D6279" size={20} />
        </span>
        <span className="text-gray-80 text-md-300">수면 시간</span>
      </div>
      <div>
        <IconChevronDown
          size={24}
          className={cn('text-gray-40', {
            'rotate-180': isAccordionOpen,
          })}
        />
      </div>
    </div>
  );
}
