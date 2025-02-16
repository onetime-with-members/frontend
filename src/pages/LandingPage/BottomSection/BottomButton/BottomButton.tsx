import { useNavigate } from 'react-router-dom';

import Button from '@/components/button/Button/Button';

export default function BottomButton() {
  const navigate = useNavigate();

  function handleStartButtonClick() {
    navigate('/events/new');
  }

  return (
    <Button
      variant="black"
      className="w-full max-w-80"
      onClick={handleStartButtonClick}
      fullWidth
    >
      이벤트 생성하기
    </Button>
  );
}
