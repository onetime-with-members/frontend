import { deleteCookie, getCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';

import Button from '@/components/button';
import useHomeUrl from '@/hooks/useHomeUrl';
import { useProgressRouter } from '@/navigation';
import Image from 'next/image';

export default function WelcomeScreen({ nickname }: { nickname: string }) {
  const homeUrl = useHomeUrl();

  const progressRouter = useProgressRouter();
  const t = useTranslations('onboarding');

  function handleStartButtonClick() {
    const redirectUrl = getCookie('redirect-url');

    if (redirectUrl) {
      deleteCookie('redirect-url');
      progressRouter.push(redirectUrl as string);
    } else {
      progressRouter.push(homeUrl);
    }
  }

  return (
    <section className="flex flex-1 -translate-y-6 flex-col items-center justify-center gap-12 md:-translate-y-16">
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
              name: nickname,
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
