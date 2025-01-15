import FloatingBottomButton from '../../../../components/floating-button/FloatingBottomButton';

interface BottomButtonForMobileProps {
  onClick: () => void;
  disabled: boolean;
}

export default function BottomButtonForMobile({
  onClick,
  disabled,
}: BottomButtonForMobileProps) {
  return (
    <div className="block md:hidden">
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
