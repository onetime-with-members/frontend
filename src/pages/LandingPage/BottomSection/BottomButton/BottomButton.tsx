import { useNavigate } from 'react-router-dom';

import CTAButton from '@/components/button/CTAButton/CTAButton';

export default function BottomButton() {
  const navigate = useNavigate();

  function handleStartButtonClick() {
    navigate('/events/new');
  }

  return (
    <CTAButton variant="black" onClick={handleStartButtonClick}>
      이벤트 생성하기
    </CTAButton>
  );
}
