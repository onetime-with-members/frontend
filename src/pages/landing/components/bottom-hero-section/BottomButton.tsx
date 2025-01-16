import { useNavigate } from 'react-router-dom';

import Button from '../../../../components/button/Button';

export default function BottomButton() {
  const navigate = useNavigate();

  function handleStartButtonClick() {
    navigate('/events/new');
  }

  return (
    <Button
      variant="black"
      className="mx-auto w-full max-w-[23rem]"
      onClick={handleStartButtonClick}
    >
      이벤트 생성하기
    </Button>
  );
}
