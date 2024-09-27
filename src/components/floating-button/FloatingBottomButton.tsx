import Button from '../button/Button';

interface BottomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function FloatingBottomButton({
  children,
  ...rest
}: BottomButtonProps) {
  return (
    <div className="fixed bottom-4 left-0 w-full px-4">
      <div className="mx-auto w-full max-w-screen-sm">
        <Button {...rest}>{children}</Button>
      </div>
    </div>
  );
}
