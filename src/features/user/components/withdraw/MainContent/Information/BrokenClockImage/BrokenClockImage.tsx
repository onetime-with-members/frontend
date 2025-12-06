import { useTranslations } from 'next-intl';

import Image from 'next/image';

export default function BrokenClockImage() {
  const t = useTranslations('withdraw');

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="h-[160px] w-[160px]">
        <Image
          src="/images/withdraw-clock.svg"
          alt="깨진 시계 이미지"
          width={160}
          height={160}
          className="h-full w-full"
        />
      </div>
      <h1 className="text-center text-gray-90 title-md-300">
        {t('mainTitle')}
      </h1>
    </div>
  );
}
