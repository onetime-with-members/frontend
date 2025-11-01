import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { RefreshIcon } from '@/components/icon';
import { TimeBlockBoardContext } from '@/features/schedule/contexts/TimeBlockBoardContext';

export default function ResetButton() {
  const { handleResetButtonClick } = useContext(TimeBlockBoardContext);

  const t = useTranslations('timeBlockBoard');

  return (
    <button
      type="button"
      className="flex h-[2rem] items-center gap-1 rounded-full border border-gray-10 bg-gray-00 px-3 py-1 text-gray-40 text-sm-200"
      onClick={handleResetButtonClick}
    >
      <span className="text-[14px]">
        <RefreshIcon />
      </span>
      <span>{t('reset')}</span>
    </button>
  );
}
