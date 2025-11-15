import { useContext } from 'react';

import { GuideDialogContext } from '@/features/schedule/contexts/GuideDialogContext';
import Image from 'next/image';

export default function GuideImage() {
  const {
    guideContents: { imageSrc, imageAlt },
  } = useContext(GuideDialogContext);

  return (
    <div>
      <Image src={imageSrc} alt={imageAlt} width={656} height={700} />
    </div>
  );
}
