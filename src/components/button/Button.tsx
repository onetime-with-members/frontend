import clsx from 'clsx';

interface BottomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'danger' | 'black';
}

export default function Button({
  children,
  className,
  variant = 'primary',
  ...rest
}: BottomButtonProps) {
  return (
    <button
      className={clsx(
        'w-full rounded-2xl px-4 py-4 text-gray-00 title-sm-200 disabled:bg-gray-10 disabled:text-gray-30',
        {
          'bg-primary-50': variant === 'primary',
          'bg-danger-50': variant === 'danger',
          'bg-gray-90': variant === 'black',
        },
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
