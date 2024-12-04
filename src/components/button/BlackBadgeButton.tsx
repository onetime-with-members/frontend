import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function BlackBadgeButton({
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'flex items-center gap-1 rounded-full bg-gray-90 px-6 py-3 text-gray-00',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
