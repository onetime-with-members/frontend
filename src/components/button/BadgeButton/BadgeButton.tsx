import cn from '@/lib/cn';

export default function BadgeButton({
  children,
  variant = 'primary',
  icon,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'primary' | 'black';
}) {
  return (
    <button
      className={cn(
        'flex h-14 items-center gap-1 rounded-full px-[3.75rem] text-gray-00 shadow-[0_0_30px_0_rgba(0,0,0,0.15)] duration-150 text-lg-200',
        {
          'bg-primary-50 hover:bg-primary-60 active:bg-primary-60':
            variant === 'primary',
          'bg-gray-80 hover:bg-gray-90 active:bg-gray-90': variant === 'black',
        },
      )}
      {...rest}
    >
      <span>{children}</span>
      <span>{icon}</span>
    </button>
  );
}
