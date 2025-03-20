import { deleteCookie, getCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';

import Button from '@/components/button/Button/Button';
import { useRouter } from '@/navigation';

export default function StartButton() {
  const router = useRouter();
  const t = useTranslations('onboarding');

  function handleStartButtonClick() {
    const redirectUrl = getCookie('redirect-url');

    if (redirectUrl) {
      deleteCookie('redirect-url');
      router.push(redirectUrl as string);
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
