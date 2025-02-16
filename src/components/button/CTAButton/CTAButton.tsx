import Button, { ButtonProps } from '../Button/Button';
import cn from '@/utils/cn';

interface CTAButtonProps extends ButtonProps {}

export default function CTAButton({
  className,
  children,
  ...props
}: CTAButtonProps) {
  return (
    <Button
      className={cn(
        'flex h-14 w-full max-w-80 items-center justify-center p-0',
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
