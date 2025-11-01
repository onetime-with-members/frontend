import { useTranslations } from 'next-intl';

import cn from '@/lib/cn';

export default function PossibleTimeToggle({
  isPossibleTime,
  onToggle,
  className,
}: {
  isPossibleTime: boolean;
  onToggle: () => void;
  className?: string;
}) {
  const t = useTranslations('timeBlockBoard');

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className={cn(
          'flex h-6 w-10 cursor-pointer items-center rounded-full bg-primary-50 px-[3px] duration-150',
          {
            'bg-danger-50': !isPossibleTime,
          },
        )}
        onClick={onToggle}
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
