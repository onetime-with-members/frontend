import clsx from 'clsx';
import { forwardRef } from 'react';

interface TBItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

const TBItem = forwardRef<HTMLDivElement, TBItemProps>(
  ({ active, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'h-[2rem] w-full cursor-pointer border-b border-gray-10 last:border-b-0 odd:border-dashed even:border-solid',
          className,
          {
            'bg-primary-50': active,
            'bg-gray-05': !active,
          },
        )}
        {...rest}
      />
    );
  },
);

export default TBItem;
