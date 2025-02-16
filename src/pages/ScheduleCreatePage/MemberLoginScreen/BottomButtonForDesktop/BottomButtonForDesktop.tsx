import Button from '@/components/button/Button/Button';

interface BottomButtonForDesktopProps {
  onClick: () => void;
  disabled: boolean;
}

export default function BottomButtonForDesktop({
  onClick,
  disabled,
}: BottomButtonForDesktopProps) {
  return (
    <div className="hidden md:block">
      <Button variant="dark" onClick={onClick} disabled={disabled} fullWidth>
        다음
      </Button>
    </div>
  );
}
