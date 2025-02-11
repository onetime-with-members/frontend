import cn from '@/utils/cn';

interface ShareBlueButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function ShareBlueButton({
  className,
  children,
  ...rest
}: ShareBlueButtonProps) {
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
