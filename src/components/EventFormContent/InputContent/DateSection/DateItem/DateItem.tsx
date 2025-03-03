import { forwardRef } from 'react';

import cn from '@/utils/cn';

interface DateItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const DateItem = forwardRef<HTMLButtonElement, DateItemProps>(function (
  { children, active, className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'disabled::text-gray-20 h-10 w-10 rounded-lg text-gray-70',
        {
          'bg-primary-40 text-gray-00': active,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});

DateItem.displayName = 'DateItem';

export default DateItem;
