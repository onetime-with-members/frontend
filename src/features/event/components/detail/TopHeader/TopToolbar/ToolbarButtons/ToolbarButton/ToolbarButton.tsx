import cn from '@/lib/cn';

export default function ToolbarButton({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-70 p-1.5 text-gray-00 duration-150 hover:bg-opacity-60 md:h-10 md:w-10',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
