import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/button/Button/Button';

export default function BottomButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      {t('landing.button.createEvent')}
    </Button>
  );
}
