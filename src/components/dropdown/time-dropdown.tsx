import { useRef } from 'react';

import useDropdown from '@/hooks/useDropdown';
import cn from '@/lib/cn';
import {
  IconTriangleFilled,
  IconTriangleInvertedFilled,
} from '@tabler/icons-react';

export default function TimeDropdown({
  time,
  setTime,
  className,
  variant = 'default',
}: {
  time: string;
  setTime: (time: string) => void;
  className?: string;
  variant?: 'default' | 'white';
}) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { isDropdownMenuOpen, setIsDropdownMenuOpen, handleDropdownClick } =
    useDropdown({
      dropdownRef,
    });

  function handleSelectTime(time: string) {
    setTime(time);
    setIsDropdownMenuOpen(false);
  }

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <div
        className={cn(
          'flex cursor-pointer items-center justify-between gap-4 rounded-xl bg-gray-05 px-4 py-3',
          {
            'bg-gray-00': variant === 'white',
            'bg-primary-40': isDropdownMenuOpen,
          },
        )}
        onClick={handleDropdownClick}
      >
        <span
          className={cn('text-gray-70 text-lg-200', {
            'text-gray-00': isDropdownMenuOpen,
          })}
        >
          {time}
        </span>
        {isDropdownMenuOpen ? (
          <IconTriangleFilled size={12} className="text-gray-00" />
        ) : (
          <IconTriangleInvertedFilled size={12} className="text-gray-40" />
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
