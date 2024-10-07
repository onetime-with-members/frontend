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
        'text-md-200 rounded-full px-6 py-1',
        {
          'bg-gray-80 text-gray-00': active,
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
