import cn from '@/utils/cn';

interface BadgeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'black';
}

export default function BadgeButton({
  children,
  className,
  variant = 'primary',
  ...rest
}: BadgeButtonProps) {
  return (
    <button
      className={cn(
        'flex items-center gap-1 rounded-full px-6 py-3 text-gray-00 shadow-[0_0_30px_0_rgba(0,0,0,0.15)] text-md-200',
        {
          'bg-primary-50': variant === 'primary',
          'bg-gray-90': variant === 'black',
        },
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
