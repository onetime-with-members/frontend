import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { TimeBlockBoardContext } from '@/features/schedule/contexts/TimeBlockBoardContext';
import { IconX } from '@tabler/icons-react';

export default function ClearButton() {
  const { handleClearButtonClick } = useContext(TimeBlockBoardContext);

  const t = useTranslations('timeBlockBoard');

  return (
    <button
      type="button"
      className="flex h-[2rem] items-center gap-1 rounded-full border border-danger-50 bg-gray-00 px-3 py-1 text-danger-50 text-sm-200"
      onClick={handleClearButtonClick}
    >
      <span>
        <IconX size={16} />
      </span>
      <span>{t('clear')}</span>
    </button>
  );
}
