import cn from '@/utils/cn';

interface GrayButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function GrayButton({
  className,
  children,
  ...rest
}: GrayButtonProps) {
  return (
    <button
      className={cn(
        'w-full rounded-lg bg-gray-05 px-3 py-2 text-gray-60 text-sm-200',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
