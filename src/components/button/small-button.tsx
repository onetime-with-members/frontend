import cn from '@/lib/cn';

type SmallButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function SmallButton({
  className,
  children,
  ...props
}: SmallButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg bg-primary-00 px-3 py-1.5 text-primary-50 duration-150 text-sm-200 hover:bg-primary-10 active:bg-primary-30 disabled:bg-gray-05 disabled:text-gray-40',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
