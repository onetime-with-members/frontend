import clsx from 'clsx';

import Button from '../button/Button';

interface BottomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function FloatingBottomButton({
  children,
  className,
  ...rest
}: BottomButtonProps) {
  return (
    <div className={clsx('fixed bottom-4 left-0 w-full px-4', className)}>
      <div className="mx-auto w-full max-w-screen-sm">
        <Button {...rest}>{children}</Button>
      </div>
    </div>
  );
}
