import { useLocale, useTranslations } from 'next-intl';
import { useRef } from 'react';

import { timeLabelList } from '@/features/schedule/utils';
import useDropdown from '@/hooks/useDropdown';
import cn from '@/lib/cn';
import { formatTimeAmPm } from '@/utils';
import {
  IconTriangleFilled,
  IconTriangleInvertedFilled,
} from '@tabler/icons-react';

export default function TimeDropdown({
  time,
  setTime,
  className,
  variant = 'default',
  displayFormat,
  placement = 'bottom',
  interval = '1h',
}: {
  time: string;
  setTime: (time: string) => void;
  className?: string;
  variant?: 'default' | 'white' | 'lightGray';
  displayFormat?: '24h' | '12h';
  placement?: 'top' | 'bottom';
  interval?: '1h' | '30m';
}) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const t = useTranslations('components.TimeDropdown');
  const locale = useLocale();

  const { isDropdownMenuOpen, setIsDropdownMenuOpen, handleDropdownClick } =
    useDropdown({
      dropdownRef,
    });

  function handleSelectTime(t: string) {
    setTime(t);
    setIsDropdownMenuOpen(false);
  }

  const displayTime = time
    ? displayFormat === '12h'
      ? formatTimeAmPm(time, locale)
      : time
    : t('selectTime');

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <div
        className={cn(
          'flex cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-3',
          {
            'bg-gray-05': variant === 'default',
            'bg-gray-00': variant === 'white',
            'bg-gray-10': variant === 'lightGray',
            'bg-primary-40': isDropdownMenuOpen && variant !== 'lightGray',
            'bg-gray-20': isDropdownMenuOpen && variant === 'lightGray',
          },
        )}
        onClick={handleDropdownClick}
      >
        <span
          className={cn(
            'text-lg-200',
            variant === 'lightGray'
              ? 'text-gray-70'
              : {
                  'text-gray-70': !isDropdownMenuOpen,
                  'text-gray-00': isDropdownMenuOpen,
                },
          )}
        >
          {displayTime}
        </span>
        {isDropdownMenuOpen ? (
          <IconTriangleFilled
            size={12}
            className={
              variant === 'lightGray' ? 'text-gray-50' : 'text-gray-00'
            }
          />
        ) : (
          <IconTriangleInvertedFilled
            size={12}
            className={
              variant === 'lightGray' ? 'text-gray-40' : 'text-gray-40'
            }
          />
        )}
      </div>
      {isDropdownMenuOpen && (
        <ul
          className={cn(
            'scrollbar-hidden absolute z-10 max-h-[15.5rem] w-full overflow-y-auto rounded-xl bg-gray-00 py-2 shadow-[0_4px_24px_0_rgba(0,0,0,0.15)]',
            {
              '-bottom-3 translate-y-full': placement === 'bottom',
              '-top-3 -translate-y-full': placement === 'top',
            },
          )}
        >
          {timeLabelList('00:00', '24:00', interval).map((time) => (
            <li
              key={time}
              className="w-full cursor-pointer py-2 text-center text-gray-50 text-lg-200"
              onClick={() => handleSelectTime(time)}
            >
              {time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
