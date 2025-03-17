import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import Button from '@/components/button/Button/Button';
import { PageModeContext } from '@/contexts/PageModeContext';
import cn from '@/utils/cn';

interface BottomButtonProps {
  handleSubmit: () => void;
  disabled: boolean;
  isPending: boolean;
}

export default function BottomButton({
  handleSubmit,
  disabled,
  isPending,
}: BottomButtonProps) {
  const { pageMode } = useContext(PageModeContext);

  const t = useTranslations('eventForm');

  return (
    <div className="sticky bottom-0 left-0 w-full bg-gray-00 px-4 py-4 md:static md:w-[25rem] md:bg-transparent">
      <Button
        onClick={handleSubmit}
        disabled={disabled}
        variant="dark"
        fullWidth
        className={cn({
          'cursor-default': isPending,
        })}
      >
        {pageMode === 'create' &&
          (isPending ? t('creatingEvent') : t('createEvent'))}
        {pageMode === 'edit' &&
          (isPending ? t('editingEvent') : t('editEvent'))}
      </Button>
    </div>
  );
}
