import { useTranslations } from 'next-intl';

import { IconX } from '@tabler/icons-react';

export default function ModalCloseButton({ onClick }: { onClick: () => void }) {
  const t = useTranslations('event.components.TalkCalendarSuccessModal');

  return (
    <button
      aria-label={t('closeButton')}
      className="absolute right-4 top-4 text-gray-00"
      onClick={onClick}
    >
      <IconX />
    </button>
  );
}
