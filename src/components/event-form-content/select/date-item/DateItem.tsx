import clsx from 'clsx';

interface DateItemProps {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function DateItem({
  children,
  active,
  disabled,
  className,
  onClick,
}: DateItemProps) {
  return (
    <button
      className={clsx(
        'h-10 w-10 rounded-lg',
        {
          'bg-primary-40 text-gray-00': active,
          'text-gray-70': !active && !disabled,
          'text-gray-20': disabled,
        },
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
