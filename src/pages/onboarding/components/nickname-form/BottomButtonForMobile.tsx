import Button from '../../../../components/button/Button';

interface BottomButtonForMobileProps {
  handleNextButtonClick: () => void;
  disabled: boolean;
}

export default function BottomButtonForMobile({
  handleNextButtonClick,
  disabled,
}: BottomButtonForMobileProps) {
  return (
    <div className="hidden md:block">
      <Button
        variant="black"
        onClick={handleNextButtonClick}
        disabled={disabled}
        fullWidth
      >
        다음
      </Button>
    </div>
  );
}
