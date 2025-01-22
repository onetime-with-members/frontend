import cn from '@/utils/cn';

interface MemberBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'gray' | 'white';
}

export default function MemberBadge({
  variant = 'primary',
  children,
  className,
  ...rest
}: MemberBadgeProps) {
  return (
    <span
      className={cn('rounded-full px-3 py-1 text-sm-200', className, {
        'bg-primary-00 text-primary-60': variant === 'primary',
        'bg-gray-05 text-gray-40': variant === 'gray',
        'bg-gray-00 text-gray-60': variant === 'white',
      })}
      {...rest}
    >
      {children}
    </span>
  );
}
