import React from 'react';

import cn from '@/utils/cn';

interface TimeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  backgroundColor?: 'gray' | 'white';
  mode: 'view' | 'edit';
  filled?: boolean;
  clickedFirst?: boolean;
  onClick?: () => void;
}

export default function TimeBlock({
  backgroundColor = 'gray',
  mode,
  filled,
  clickedFirst,
  ...props
}: TimeBlockProps) {
  return (
    <div
      className={cn(
        'h-[3rem] border-b border-gray-10 bg-gray-05 last:border-b-0 odd:border-dashed even:border-solid',
        {
          'bg-gray-00': backgroundColor === 'white',
        },
        {
          'bg-gray-60': filled,
        },
        {
          'cursor-pointer': mode === 'edit',
        },
        {
          'border border-dashed border-gray-60 bg-gray-20 last:border-b even:border-dashed':
            clickedFirst,
        },
      )}
      {...props}
    />
  );
}
