import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/button/Button/Button';

export default function StartButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handleStartButtonClick() {
    const redirectUrl = localStorage.getItem('redirect-url');

    if (redirectUrl) {
      localStorage.removeItem('redirect-url');
      navigate(redirectUrl);
    } else {
      navigate('/');
    }
  }

  return (
    <div className="w-full max-w-[22rem]">
      <Button variant="dark" onClick={handleStartButtonClick} fullWidth>
        {t('onboarding.start')}
      </Button>
    </div>
  );
}
