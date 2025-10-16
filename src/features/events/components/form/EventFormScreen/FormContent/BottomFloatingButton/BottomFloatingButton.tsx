import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import Button from '@/components/button';
import { PageModeContext } from '@/contexts/page-mode';
import { EventFormContext } from '@/features/events/contexts/EventFormContext';
import cn from '@/lib/cn';

export default function BottomFloatingButton({
  isCreatePending,
  isEditPending,
}: {
  isCreatePending: boolean;
  isEditPending: boolean;
}) {
  const { isValid } = useContext(EventFormContext);
  const { pageMode } = useContext(PageModeContext);

  const t = useTranslations('eventForm');

  return (
    <div className="sticky bottom-0 left-0 w-full bg-gray-00 px-4 py-4 md:static md:w-[25rem] md:bg-transparent">
      <Button
        type="submit"
        variant="dark"
        fullWidth
        className={cn({
          'pointer-events-none cursor-default':
            isCreatePending || isEditPending,
        })}
        disabled={!isValid}
      >
        {pageMode === 'create' &&
          (isCreatePending ? t('creatingEvent') : t('createEvent'))}
        {pageMode === 'edit' &&
          (isEditPending ? t('editingEvent') : t('editEvent'))}
      </Button>
    </div>
  );
}
