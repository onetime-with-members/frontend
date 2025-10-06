import cn from '@/lib/cn';

export default function CookieModalButton({
  children,
  className,
  variant,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  variant: 'primary' | 'outline';
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        'h-11 rounded-xl border border-primary-50 bg-gray-00 px-6 text-primary-50 text-md-300',
        { 'bg-primary-50 text-gray-00': variant === 'primary' },
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
