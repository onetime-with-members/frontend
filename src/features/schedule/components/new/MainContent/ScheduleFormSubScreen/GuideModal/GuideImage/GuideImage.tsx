import { useContext } from 'react';

import { GuideModalContext } from '@/features/schedule/contexts/GuideModalContext';
import Image from 'next/image';

export default function GuideImage() {
  const {
    guideContents: { imageSrc, imageAlt },
  } = useContext(GuideModalContext);

  return (
    <div>
      <Image src={imageSrc} alt={imageAlt} width={656} height={700} />
    </div>
  );
}
