import { useTranslations } from 'next-intl';

import Image from 'next/image';

interface WelcomeContentProps {
  name: string;
}

export default function WelcomeContent({ name }: WelcomeContentProps) {
  const t = useTranslations('onboarding');

  return (
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
            name,
            br: () => <br className="block md:hidden" />,
          })}
        </h1>
        <p className="text-gray-90 text-lg-200">{t('description4')}</p>
      </div>
    </div>
  );
}
