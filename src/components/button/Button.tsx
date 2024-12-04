import clsx from 'clsx';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'black';
}

export default function Button({
  children,
  className,
  variant = 'primary',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'w-full rounded-2xl px-4 py-4 title-sm-200 disabled:bg-gray-10 disabled:text-gray-30',
        {
          'bg-primary-50 text-gray-00': variant === 'primary',
          'bg-primary-00 text-primary-50': variant === 'secondary',
          'bg-danger-50 text-gray-00': variant === 'danger',
          'bg-gray-90 text-gray-00': variant === 'black',
        },
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
