import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/button/Button/Button';
import { PageModeContext } from '@/contexts/PageModeContext';

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

  const { t } = useTranslation();

  return (
    <div className="sticky bottom-0 left-0 w-full bg-gray-00 px-4 py-4 md:static md:w-[25rem] md:bg-transparent">
      <Button
        onClick={handleSubmit}
        disabled={disabled}
        variant="dark"
        fullWidth
      >
        {pageMode === 'create' &&
          (isPending ? t('eventForm.creatingEvent') : t('common.createEvent'))}
        {pageMode === 'edit' &&
          (isPending ? t('eventForm.editingEvent') : t('eventForm.editEvent'))}
      </Button>
    </div>
  );
}
