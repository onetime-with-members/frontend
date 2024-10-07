import clsx from 'clsx';

interface GrayButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function GrayButton({
  className,
  children,
  ...rest
}: GrayButtonProps) {
  return (
    <button
      className={clsx(
        'text-sm-200 w-full rounded-lg bg-gray-05 px-3 py-2 text-gray-60',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
