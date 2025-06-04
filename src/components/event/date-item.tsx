import { forwardRef } from 'react';

import cn from '@/lib/cn';

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
      type="button"
      className={cn(
        'h-10 w-10 rounded-lg bg-gray-00 text-gray-70 duration-150 hover:bg-primary-10 active:bg-primary-30 disabled:text-gray-20',
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
