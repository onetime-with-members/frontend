import cn from '@/lib/cn';

interface BadgeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'black';
}

export default function BadgeButton({
  children,
  variant = 'primary',
  ...rest
}: BadgeButtonProps) {
  return (
    <button
      className={cn(
        'flex items-center gap-1 rounded-full px-6 py-3 text-gray-00 shadow-[0_0_30px_0_rgba(0,0,0,0.15)] duration-150 text-md-200',
        {
          'bg-primary-50 hover:bg-primary-60 active:bg-primary-60':
            variant === 'primary',
          'bg-gray-80 hover:bg-gray-90 active:bg-gray-90': variant === 'black',
        },
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
