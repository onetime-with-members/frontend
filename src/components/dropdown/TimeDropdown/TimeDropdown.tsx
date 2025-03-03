import { useRef } from 'react';

import TimeDropdownItem from './TimeDropdownItem/TimeDropdownItem';
import useDropdown from '@/hooks/useDropdown';
import cn from '@/utils/cn';
import {
  IconTriangleFilled,
  IconTriangleInvertedFilled,
} from '@tabler/icons-react';

interface TimeDropdownProps {
  time: string;
  setTime: (time: string) => void;
  className?: string;
  variant?: 'default' | 'white';
}

export default function TimeDropdown({
  time,
  setTime,
  className,
  variant = 'default',
}: TimeDropdownProps) {
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
            <TimeDropdownItem
              key={time}
              onClick={() =>
                handleSelectTime(`${time.toString().padStart(2, '0')}:00`)
              }
            >
              {time.toString().padStart(2, '0')}:00
            </TimeDropdownItem>
          ))}
        </ul>
      )}
    </div>
  );
}
