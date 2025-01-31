import Button from '@/components/button/Button';

interface BottomButtonForDesktopProps {
  handleNextButtonClick: () => void;
  handleBackButtonClick: () => void;
  disabled: boolean;
  page: number;
}

export default function BottomButtonForDesktop({
  handleNextButtonClick,
  handleBackButtonClick,
  disabled,
  page,
}: BottomButtonForDesktopProps) {
  return (
    <div className="hidden flex-col gap-4 md:flex">
      <Button
        onClick={handleNextButtonClick}
        disabled={disabled}
        variant="black"
        fullWidth
      >
        다음
      </Button>
      <button
        className="text-gray-40 text-md-200"
        onClick={handleBackButtonClick}
      >
        {page === 1 ? '돌아가기' : '이전으로'}
      </button>
    </div>
  );
}
