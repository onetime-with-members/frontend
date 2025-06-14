import { deleteCookie, getCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';

import Button from '@/components/button';
import cn from '@/lib/cn';
import { OnboardingValueType } from '@/lib/types';
import { useRouter } from '@/navigation';
import Image from 'next/image';

export default function WelcomeScreen({
  isVisible,
  value,
}: {
  isVisible: boolean;
  value: OnboardingValueType;
}) {
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
    <section
      className={cn(
        'flex flex-1 -translate-y-6 flex-col items-center justify-center gap-12 md:-translate-y-16',
        {
          hidden: !isVisible,
        },
      )}
    >
      <div className="flex flex-col items-center gap-6">
        <div>
          <Image
            src="/images/welcome-clock.svg"
            alt="시계 이미지"
            width={160}
            height={160}
            className="h-[10rem] w-[10rem]"
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-[2rem] font-bold text-gray-90">
            {t.rich('title4', {
              name: value.nickname,
              br: () => <br className="block md:hidden" />,
            })}
          </h1>
          <p className="text-gray-90 text-lg-200">{t('description4')}</p>
        </div>
      </div>
      <div className="w-full max-w-[22rem]">
        <Button variant="dark" onClick={handleStartButtonClick} fullWidth>
          {t('start')}
        </Button>
      </div>
    </section>
  );
}
