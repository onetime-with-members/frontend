import { useLocale, useTranslations } from 'next-intl';

import Image from 'next/image';

export default function ModalImage() {
  const t = useTranslations('event.components.TalkCalendarSuccessModal');
  const locale = useLocale();

  return (
    <Image
      src={`/images/kakao/talk-calendar-guide-${locale}.png`}
      width={360}
      height={384}
      alt={t('imageAlt')}
    />
  );
}
