import { useRef } from 'react';

import useDropdown from '@/hooks/useDropdown';
import cn from '@/lib/cn';
import {
  IconTriangleFilled,
  IconTriangleInvertedFilled,
} from '@tabler/icons-react';

function formatTimeAmPm(time: string): string {
  const [hStr, mStr] = time.split(':');
  const h = parseInt(hStr, 10);
  const m = mStr ?? '00';
  if (h === 0) return `오전 12:${m}`;
  if (h < 12) return `오전 ${h}:${m}`;
  if (h === 12) return `오후 12:${m}`;
  return `오후 ${h - 12}:${m}`;
}

export default function TimeDropdown({
  time,
  setTime,
  className,
  variant = 'default',
  displayFormat,
}: {
  time: string;
  setTime: (time: string) => void;
  className?: string;
  variant?: 'default' | 'white' | 'lightGray';
  displayFormat?: '24h' | '12h';
}) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { isDropdownMenuOpen, setIsDropdownMenuOpen, handleDropdownClick } =
    useDropdown({
      dropdownRef,
    });

  function handleSelectTime(t: string) {
    setTime(t);
    setIsDropdownMenuOpen(false);
  }

  const displayTime =
    displayFormat === '12h' ? formatTimeAmPm(time) : time;

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
            className={variant === 'lightGray' ? 'text-gray-50' : 'text-gray-00'}
          />
        ) : (
          <IconTriangleInvertedFilled
            size={12}
            className={variant === 'lightGray' ? 'text-gray-40' : 'text-gray-40'}
          />
        )}
      </div>
      {isDropdownMenuOpen && (
        <ul className="scrollbar-hidden absolute -bottom-3 z-10 max-h-[15.5rem] w-full translate-y-full overflow-y-auto rounded-xl bg-gray-00 py-2 shadow-[0_4px_24px_0_rgba(0,0,0,0.15)]">
          {Array.from({ length: 25 }, (_, index) => index).map((time) => (
            <li
              key={time}
              className={cn(
                'w-full cursor-pointer py-2 text-center text-gray-50 text-lg-200',
                className,
              )}
              onClick={() =>
                handleSelectTime(`${time.toString().padStart(2, '0')}:00`)
              }
            >
              {time.toString().padStart(2, '0')}:00
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
