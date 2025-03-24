import cn from '@/utils/cn';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'dark' | 'black' | 'danger';
  fullWidth?: boolean;
}

export default function Button({
  children,
  className,
  variant = 'dark',
  fullWidth = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        'flex h-14 items-center justify-center rounded-2xl px-4 text-gray-00 duration-150 text-lg-200 disabled:bg-gray-10 disabled:text-gray-30',
        {
          'bg-danger-50 hover:bg-danger-40 active:bg-danger-40':
            variant === 'danger',
          'bg-gray-80 hover:bg-gray-90 active:bg-gray-90': variant === 'dark',
          'bg-gray-90 hover:bg-[#0c0c0f] active:bg-[#0c0c0f]':
            variant === 'black',
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
