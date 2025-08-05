import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import CircleArrowButton from '@/components/button/circle-arrow-button';
import LoadIcon from '@/components/icon/LoadIcon';
import RefreshIcon from '@/components/icon/RefreshIcon';
import cn from '@/lib/cn';
import { IconX } from '@tabler/icons-react';

export function CircleArrowButtonForBoard({
  isVisible,
  direction,
  onClick,
  isTargetOnBottom,
}: {
  isVisible: boolean;
  direction: 'left' | 'right';
  onClick: () => void;
  isTargetOnBottom: boolean;
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn('sticky top-[174px] z-[5] md:top-[186px]', {
            static: isTargetOnBottom,
          })}
        >
          <CircleArrowButton
            direction={direction}
            className={cn('absolute z-10 mt-40', {
              'bottom-40 mt-0': isTargetOnBottom,
              'left-10': direction === 'left',
              'right-6': direction === 'right',
            })}
            onClick={onClick}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ClearButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const t = useTranslations('timeBlockBoard');

  return (
    <button
      type="button"
      className={cn(
        'flex h-[2rem] items-center gap-1 rounded-full border border-danger-50 bg-gray-00 px-3 py-1 text-danger-50 text-sm-200',
        className,
      )}
      {...props}
    >
      <span>
        <IconX size={16} />
      </span>
      <span>{t('clear')}</span>
    </button>
  );
}

export function ReloadButton({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  const t = useTranslations();

  return (
    <button
      type="button"
      className={cn(
        'flex h-8 items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-gray-00 text-sm-200',
        className,
      )}
      {...props}
    >
      <span>
        <LoadIcon fontSize={16} />
      </span>
      <span>{t('timeBlockBoard.reload')}</span>
    </button>
  );
}

export function ResetButton({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  const t = useTranslations('timeBlockBoard');

  return (
    <button
      type="button"
      className={cn(
        'flex h-[2rem] items-center gap-1 rounded-full border border-gray-10 bg-gray-00 px-3 py-1 text-gray-40 text-sm-200',
        className,
      )}
      {...props}
    >
      <span className="text-[14px]">
        <RefreshIcon />
      </span>
      <span>{t('reset')}</span>
    </button>
  );
}

export function PossibleTimeToggle({
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
