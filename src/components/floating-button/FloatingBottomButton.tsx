import clsx from 'clsx';

import Button, { ButtonProps } from '../button/Button';

interface FloatingBottomButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export default function FloatingBottomButton({
  children,
  className,
  ...rest
}: FloatingBottomButtonProps) {
  return (
    <div className={clsx('fixed bottom-4 left-0 w-full px-4', className)}>
      <div className="mx-auto w-full max-w-screen-sm">
        <Button {...rest}>{children}</Button>
      </div>
    </div>
  );
}
