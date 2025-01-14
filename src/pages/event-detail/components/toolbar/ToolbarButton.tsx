import clsx from 'clsx';

interface ToolbarButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'yellow' | 'gray';
}

export default function ToolbarButton({
  className,
  children,
  variant = 'primary',
  ...props
}: ToolbarButtonProps) {
  return (
    <button
      className={clsx(
        'flex h-10 w-10 items-center justify-center overflow-hidden rounded-full p-1.5',
        {
          'bg-primary-40': variant === 'primary',
          'bg-[#FAE100]': variant === 'yellow',
          'bg-gray-50': variant === 'gray',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
