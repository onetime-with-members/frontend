import Button from '@/components/button/Button';

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
      <Button variant="black" onClick={onClick} disabled={disabled} fullWidth>
        다음
      </Button>
    </div>
  );
}
