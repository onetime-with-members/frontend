import { useLocale } from 'next-intl';

import Image from 'next/image';

export default function ImageGuide() {
  const locale = useLocale();

  return (
    <div className="overflow-hidden rounded-2xl">
      <Image
        src={
          locale === 'ko'
            ? '/images/everytime-url-guide-ko.png'
            : '/images/everytime-url-guide-en.png'
        }
        alt="Setting Icon -> Copy URL"
        width={640}
        height={792}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
