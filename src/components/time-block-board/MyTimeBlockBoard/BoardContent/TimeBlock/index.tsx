import React from 'react';

import cn from '@/utils/cn';

interface TimeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  backgroundColor?: 'gray' | 'white';
  filled?: boolean;
  clickedFirst?: boolean;
  onClick?: () => void;
}

export default function TimeBlock({
  backgroundColor = 'gray',
  filled,
  clickedFirst,
  ...props
}: TimeBlockProps) {
  return (
    <div
      className={cn(
        'h-[3rem] border-b border-gray-10 last:border-b-0 odd:border-dashed even:border-solid',
        {
          'bg-gray-05': backgroundColor === 'gray',
          'bg-gray-00': backgroundColor === 'white',
        },
        {
          'bg-primary-40': filled,
        },
        {
          'border border-dashed border-primary-50 bg-primary-10 even:border-dashed':
            clickedFirst,
        },
      )}
      {...props}
    />
  );
}
