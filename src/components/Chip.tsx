import clsx from 'clsx';

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export default function Chip({
  children,
  active,
  className,
  ...rest
}: ChipProps) {
  return (
    <button
      className={clsx(
        'rounded-full px-6 py-1 text-md-200',
        {
          'bg-primary-40 text-gray-00': active,
          'bg-gray-05 text-gray-40': !active,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
