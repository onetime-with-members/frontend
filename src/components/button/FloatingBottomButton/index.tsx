import Button, { ButtonProps } from '../Button';
import cn from '@/utils/cn';

interface FloatingBottomButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export default function FloatingBottomButton({
  children,
  className,
  ...rest
}: FloatingBottomButtonProps) {
  return (
    <div className={cn('fixed bottom-4 left-0 w-full px-4', className)}>
      <div className="mx-auto w-full max-w-screen-sm">
        <Button fullWidth {...rest}>
          {children}
        </Button>
      </div>
    </div>
  );
}
