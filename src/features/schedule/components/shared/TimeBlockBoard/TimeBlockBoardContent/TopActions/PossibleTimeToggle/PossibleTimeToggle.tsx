import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { TimeBlockBoardContext } from '@/features/schedule/contexts/TimeBlockBoardContext';
import cn from '@/lib/cn';

export default function PossibleTimeToggle() {
  const { isPossibleTime, handleAvailableToggle } = useContext(
    TimeBlockBoardContext,
  );

  const t = useTranslations('timeBlockBoard');

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          'flex h-6 w-10 cursor-pointer items-center rounded-full bg-primary-50 px-[3px] duration-150',
          {
            'bg-danger-50': !isPossibleTime,
          },
        )}
        onClick={handleAvailableToggle}
      >
        <div
          className={cn(
            'h-[18px] w-[18px] translate-x-0 rounded-full bg-white duration-150',
            {
              'translate-x-[16.5px]': !isPossibleTime,
            },
          )}
        ></div>
      </div>
      <span className="text-gray-60 text-md-200">
        {isPossibleTime ? t('availableToggleText') : t('unavailableToggleText')}
      </span>
    </div>
  );
}
