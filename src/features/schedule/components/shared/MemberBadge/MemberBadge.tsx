import cn from '@/lib/cn';

export default function MemberBadge({
  variant = 'primary',
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'primary' | 'gray' | 'white';
}) {
  return (
    <span
      className={cn(
        'overflow-hidden text-ellipsis whitespace-nowrap rounded-lg px-2 py-0.5 text-sm-200',
        className,
        {
          'bg-primary-00 text-primary-60': variant === 'primary',
          'bg-gray-05 text-gray-40': variant === 'gray',
          'bg-gray-00 text-gray-60': variant === 'white',
        },
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
