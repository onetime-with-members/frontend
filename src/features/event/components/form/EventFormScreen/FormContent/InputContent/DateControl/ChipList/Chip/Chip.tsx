import cn from '@/lib/cn';

type ChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export default function Chip({
  children,
  active,
  className,
  ...rest
}: ChipProps) {
  return (
    <button
      className={cn(
        'rounded-full bg-gray-05 px-6 py-1 text-gray-40 text-md-200',
        {
          'bg-primary-40 text-gray-00': active,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
