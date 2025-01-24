import { forwardRef } from 'react';

import cn from '@/utils/cn';

interface TimeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  clickedFirst?: boolean;
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
      clickedFirst,
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
          'h-[2rem] w-full border-b border-gray-10 bg-gray-05 last:border-b-0 odd:border-dashed even:border-solid',
          className,
          {
            'bg-gray-00': backgroundColor === 'white',
            'bg-primary-50': isPossibleTime && active,
            'bg-primary-30': isPossibleTime && clickedFirst,
            'bg-danger-50': !isPossibleTime && !active,
            'bg-danger-30': !isPossibleTime && clickedFirst,
            'bg-success-50': isAllMembersAvailable,
          },
          {
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
