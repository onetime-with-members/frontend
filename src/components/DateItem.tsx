import clsx from 'clsx';

interface DateItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export default function DateItem({
  children,
  active,
  className,
  ...rest
}: DateItemProps) {
  return (
    <button
      className={clsx(
        'h-10 w-10 rounded-lg',
        {
          'bg-primary-40 text-gray-00': active,
          'bg-gray-05 text-gray-30': !active,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
