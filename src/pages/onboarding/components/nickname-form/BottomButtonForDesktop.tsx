import FloatingBottomButton from '../../../../components/floating-button/FloatingBottomButton';

interface BottomButtonForDesktopProps {
  handleNextButtonClick: () => void;
  disabled: boolean;
}

export default function BottomButtonForDesktop({
  handleNextButtonClick,
  disabled,
}: BottomButtonForDesktopProps) {
  return (
    <div className="block md:hidden">
      <FloatingBottomButton
        onClick={handleNextButtonClick}
        disabled={disabled}
        variant="black"
      >
        다음
      </FloatingBottomButton>
    </div>
  );
}
