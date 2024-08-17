import TimeAccordionItem from '../TimeAccordionItem';
import { IconX } from '@tabler/icons-react';

interface RecommendTimeDialogProps {
  onClose: () => void;
}

export default function RecommendTimeDialog({
  onClose,
}: RecommendTimeDialogProps) {
  const style = {
    dateTitle: 'text-lg-300 text-gray-60',
    timeAccordionList: 'mt-3 flex flex-col gap-3',
  };

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="max-h-[30rem] w-[23rem] cursor-auto overflow-y-auto rounded-2xl bg-gray-00"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <h2 className="text-lg-300 text-gray-80">
            가능한 시간은 언제일까요?
          </h2>
          <button className="cursor-pointer text-gray-40" onClick={onClose}>
            <IconX size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-8 px-5 pb-7 pt-4">
          <div>
            <h3 className={style.dateTitle}>2024.03.01 월</h3>
            <ul className={style.timeAccordionList}>
              <TimeAccordionItem />
              <TimeAccordionItem />
            </ul>
          </div>
          <div>
            <h3 className={style.dateTitle}>2024.03.01 월</h3>
            <ul className={style.timeAccordionList}>
              <TimeAccordionItem />
              <TimeAccordionItem />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
