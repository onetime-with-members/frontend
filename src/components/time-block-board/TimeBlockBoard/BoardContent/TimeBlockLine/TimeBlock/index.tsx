import { forwardRef } from 'react';

import cn from '@/utils/cn';

interface TimeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  bgOpacity?: number;
  editable?: boolean;
  cursorPointer?: boolean;
  isPossibleTime?: boolean;
  isAllMembersAvailable?: boolean;
  backgroundColor: 'white' | 'gray';
}

const TimeBlock = forwardRef<HTMLDivElement, TimeBlockProps>(
  (
    {
      active,
      className,
      bgOpacity = 1,
      style,
      editable,
      cursorPointer = true,
      isPossibleTime = true,
      isAllMembersAvailable = false,
      backgroundColor = 'gray',
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'h-[2rem] w-full border-b border-gray-10 last:border-b-0 odd:border-dashed even:border-solid',
          className,
          {
            'bg-primary-50': isPossibleTime && active,
            'bg-danger-50': !isPossibleTime && !active,
            'bg-gray-05': isPossibleTime
              ? !active && backgroundColor === 'gray'
              : active && backgroundColor === 'gray',
            'bg-gray-00': isPossibleTime
              ? !active && backgroundColor === 'white'
              : active && backgroundColor === 'white',
            'bg-success-50': isAllMembersAvailable,
            'cursor-pointer': cursorPointer,
          },
        )}
        style={{
          backgroundColor: editable
            ? ''
            : active && !isAllMembersAvailable
              ? `rgba(76, 101, 229, ${bgOpacity})`
              : '',
          ...style,
        }}
        {...rest}
      />
    );
  },
);

export default TimeBlock;
