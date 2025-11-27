import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import Button from '@/components/button';
import { EventFormContext } from '@/features/event/contexts/EventFormContext';
import { PageModeContext } from '@/features/event/contexts/PageModeContext';
import cn from '@/lib/cn';

export default function BottomFloatingButton({
  isCreateLoading,
  isEditLoading,
}: {
  isCreateLoading: boolean;
  isEditLoading: boolean;
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
            isCreateLoading || isEditLoading,
        })}
        disabled={!isValid}
      >
        {pageMode === 'create' &&
          (isCreateLoading ? t('creatingEvent') : t('createEvent'))}
        {pageMode === 'edit' &&
          (isEditLoading ? t('editingEvent') : t('editEvent'))}
      </Button>
    </div>
  );
}
