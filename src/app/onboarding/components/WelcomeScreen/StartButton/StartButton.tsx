import { useTranslations } from 'next-intl';

import Button from '@/components/button/Button/Button';
import { useRouter } from 'next/navigation';

export default function StartButton() {
  const router = useRouter();
  const t = useTranslations('onboarding');

  function handleStartButtonClick() {
    const redirectUrl = localStorage.getItem('redirect-url');

    if (redirectUrl) {
      localStorage.removeItem('redirect-url');
      router.push(redirectUrl);
    } else {
      router.push('/');
    }
  }

  return (
    <div className="w-full max-w-[22rem]">
      <Button variant="dark" onClick={handleStartButtonClick} fullWidth>
        {t('start')}
      </Button>
    </div>
  );
}
