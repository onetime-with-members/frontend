import clsx from 'clsx';

interface MemberBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'gray';
}

export default function MemberBadge({
  variant = 'primary',
  children,
  ...rest
}: MemberBadgeProps) {
  return (
    <span
      className={clsx('text-sm-200 rounded-full px-3 py-1', {
        'bg-primary-00 text-primary-60': variant === 'primary',
        'bg-gray-05 text-gray-40': variant === 'gray',
      })}
      {...rest}
    >
      {children}
    </span>
  );
}
