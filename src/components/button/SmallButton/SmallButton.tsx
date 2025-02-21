import cn from '@/utils/cn';

interface SmallButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gray';
}

export default function SmallButton({
  variant = 'primary',
  className,
  children,
  ...props
}: SmallButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg bg-primary-00 px-3 py-1.5 text-primary-40 text-sm-200',
        {
          'bg-gray-10 text-gray-50': variant === 'gray',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
