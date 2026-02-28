import { useLocale, useTranslations } from 'next-intl';
import { createPortal } from 'react-dom';

import ConfirmedTimeSummary from './ConfirmedTimeSummary';
import ModalButton from './ModalButton/ModalButton';
import cn from '@/lib/cn';

export default function ActionConfirmModal({
  onCancel,
  onConfirm,
  isPending,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  isPending: boolean;
}) {
  const t = useTranslations('event.components.ActionConfirmModal');
  const locale = useLocale();

  return createPortal(
    <div className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50 px-4">
      <div
        className={cn(
          'relative flex w-full max-w-[328px] cursor-auto flex-col overflow-hidden rounded-2xl bg-gray-00',
          {
            'max-w-[360px]': locale === 'en',
          },
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <ConfirmedTimeSummary />
        <div className="px-4 py-6 text-center">
          <h3 className="text-gray-80 text-lg-300">{t('confirmQuestion')}</h3>
          <p className="text-gray-50 text-md-200">{t('warningText')}</p>
        </div>
        <div className="grid grid-cols-2 gap-1.5 px-3 pb-3">
          <ModalButton variant="secondary" onClick={onCancel}>
            {t('cancel')}
          </ModalButton>
          <ModalButton
            variant="primary"
            onClick={onConfirm}
            isPending={isPending}
          >
            {isPending ? t('submitting') : t('confirm')}
          </ModalButton>
        </div>
      </div>
    </div>,
    document.getElementById('pop-up')!,
  );
}
