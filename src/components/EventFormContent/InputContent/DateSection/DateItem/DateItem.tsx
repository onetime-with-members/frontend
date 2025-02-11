import { forwardRef } from 'react';

import cn from '@/utils/cn';

interface DateItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  disabled?: boolean;
}

const DateItem = forwardRef<HTMLButtonElement, DateItemProps>(function (
  { children, active, disabled, className, onClick, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'h-10 w-10 rounded-lg text-gray-70',
        {
          'bg-primary-40 text-gray-00': active,
          'text-gray-20': disabled,
        },
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

export default DateItem;
