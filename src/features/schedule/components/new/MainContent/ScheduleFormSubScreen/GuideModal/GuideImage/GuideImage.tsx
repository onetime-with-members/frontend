import { useLocale } from 'next-intl';
import { useContext } from 'react';

import { GuideModalContext } from '@/features/schedule/contexts/GuideModalContext';
import Image from 'next/image';

export default function GuideImage() {
  const {
    guideContents: { imageSrc, imageAlt },
  } = useContext(GuideModalContext);

  const locale = useLocale();

  return (
    <div>
      <Image
        src={locale === 'ko' ? imageSrc.ko : imageSrc.en}
        alt={locale === 'ko' ? imageAlt.ko : imageAlt.en}
        width={656}
        height={700}
      />
    </div>
  );
}
