import cn from '@/lib/cn';

export default function GrayButton({
  className,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'w-full rounded-lg bg-gray-05 px-3 py-2 text-gray-60 duration-150 text-sm-200 hover:bg-gray-10 active:bg-gray-10',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
