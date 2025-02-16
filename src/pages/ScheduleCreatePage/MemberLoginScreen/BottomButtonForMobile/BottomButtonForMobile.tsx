import FloatingBottomButton from '@/components/button/FloatingBottomButton/FloatingBottomButton';

interface BottomButtonForMobileProps {
  onClick: () => void;
  disabled: boolean;
}

export default function BottomButtonForMobile({
  onClick,
  disabled,
}: BottomButtonForMobileProps) {
  return (
    <div className="block sm:hidden">
      <FloatingBottomButton
        variant="black"
        onClick={onClick}
        disabled={disabled}
        fullWidth
      >
        다음
      </FloatingBottomButton>
    </div>
  );
}
