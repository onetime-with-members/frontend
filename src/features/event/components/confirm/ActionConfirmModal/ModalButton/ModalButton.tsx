import cn from '@/lib/cn';

export default function ModalButton({
  children,
  variant = 'primary',
  onClick,
  isPending,
}: {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  onClick: () => void;
  isPending?: boolean;
}) {
  return (
    <button
      className={cn('rounded-xl bg-primary-40 p-3 text-gray-00 text-md-300', {
        'bg-gray-10 text-gray-50': variant === 'secondary',
        'pointer-events-none cursor-default': isPending,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
