import { useNavigate } from 'react-router-dom';

import Button from '@/components/button/Button';

interface BottomButtonForDesktopProps {
  handleNextButtonClick: () => void;
  disabled: boolean;
}

export default function BottomButtonForDesktop({
  handleNextButtonClick,
  disabled,
}: BottomButtonForDesktopProps) {
  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate(-1);
  }

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
        돌아가기
      </button>
    </div>
  );
}
