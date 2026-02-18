import cn from '@/lib/cn';

export default function ActionButton({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-60 duration-150 hover:brightness-90 md:h-8 md:w-8',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
