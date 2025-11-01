import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { LoadIcon } from '@/components/icon';
import { TimeBlockBoardContext } from '@/features/schedule/contexts/TimeBlockBoardContext';

export default function ReloadButton() {
  const { handleReloadButtonClick } = useContext(TimeBlockBoardContext);

  const t = useTranslations('timeBlockBoard');

  return (
    <button
      type="button"
      className="flex h-8 items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-gray-00 text-sm-200"
      onClick={handleReloadButtonClick}
    >
      <span>
        <LoadIcon fontSize={16} />
      </span>
      <span>{t('reload')}</span>
    </button>
  );
}
