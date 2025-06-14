import Button, { ButtonProps } from '.';

import cn from '@/lib/cn';

interface FloatingBottomButtonProps extends ButtonProps {
  children: React.ReactNode;
  maxWidth?: number;
}

export default function FloatingBottomButton({
  children,
  className,
  maxWidth = 640,
  ...rest
}: FloatingBottomButtonProps) {
  return (
    <div className={cn('fixed bottom-4 left-0 w-full px-4', className)}>
      <div
        className="mx-auto w-full"
        style={{
          maxWidth: `${maxWidth}px`,
        }}
      >
        <Button fullWidth {...rest}>
          {children}
        </Button>
      </div>
    </div>
  );
}
