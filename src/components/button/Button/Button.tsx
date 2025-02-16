import cn from '@/utils/cn';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'black';
  fullWidth?: boolean;
}

export default function Button({
  children,
  className,
  variant = 'primary',
  fullWidth = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        'flex h-14 items-center justify-center rounded-2xl px-4 text-lg-200 disabled:bg-gray-10 disabled:text-gray-30',
        {
          'bg-primary-50 text-gray-00': variant === 'primary',
          'bg-primary-00 text-primary-50': variant === 'secondary',
          'bg-danger-50 text-gray-00': variant === 'danger',
          'bg-gray-90 text-gray-00': variant === 'black',
        },
        { 'w-full': fullWidth },
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
