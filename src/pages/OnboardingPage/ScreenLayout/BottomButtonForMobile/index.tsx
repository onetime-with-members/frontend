import FloatingBottomButton from '@/components/button/FloatingBottomButton';

interface BottomButtonForMobileProps {
  handleNextButtonClick: () => void;
  disabled: boolean;
}

export default function BottomButtonForMobile({
  handleNextButtonClick,
  disabled,
}: BottomButtonForMobileProps) {
  return (
    <div className="block md:hidden">
      <FloatingBottomButton
        variant="black"
        onClick={handleNextButtonClick}
        disabled={disabled}
        fullWidth
      >
        다음
      </FloatingBottomButton>
    </div>
  );
}
