import { useContext } from 'react';

import { MyTimeBlockBoardContext } from '@/features/my-schedule/contexts/MyTimeBlockBoardContext';
import cn from '@/lib/cn';

export default function TimeBlock({
  filled,
  clickedFirst,
  onClick,
}: {
  filled?: boolean;
  clickedFirst?: boolean;
  onClick: () => void;
}) {
  const { backgroundColor, mode } = useContext(MyTimeBlockBoardContext);

  return (
    <div
      className={cn(
        'h-[3rem] border-b border-gray-10 bg-gray-05 last:border-b-0 odd:border-dashed even:border-solid',
        {
          'bg-gray-00': backgroundColor === 'white',
          'bg-gray-60': filled,
          'cursor-pointer': mode === 'edit',
          'border border-dashed border-gray-60 bg-gray-20 last:border-b even:border-dashed':
            clickedFirst,
        },
      )}
      onClick={onClick}
    />
  );
}
