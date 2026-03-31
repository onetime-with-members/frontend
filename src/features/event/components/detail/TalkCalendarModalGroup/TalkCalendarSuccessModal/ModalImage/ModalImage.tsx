import { useTranslations } from 'next-intl';

import Image from 'next/image';

export default function ModalImage() {
  const t = useTranslations('event.components.TalkCalendarSuccessModal');

  return (
    <Image
      src="/images/kakao/talk-calendar-guide.png"
      width={360}
      height={384}
      alt={t('imageAlt')}
    />
  );
}
