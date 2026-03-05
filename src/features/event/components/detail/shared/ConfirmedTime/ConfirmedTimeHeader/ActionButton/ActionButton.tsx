import cn from '@/lib/cn';

export default function ActionButton({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-60 text-gray-00 duration-150 hover:brightness-90',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
