import cn from '@/lib/cn';

export default function ShareBlueButton({
  className,
  children,
  ...rest
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'rounded-full bg-primary-00 p-3 text-primary-40',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
