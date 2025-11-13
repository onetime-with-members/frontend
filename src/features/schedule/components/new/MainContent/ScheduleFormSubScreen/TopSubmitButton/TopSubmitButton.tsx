import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import SmallButton from '@/components/button/SmallButton';
import cn from '@/lib/cn';

export default function TopSubmitButton({
  onClick,
  isPending,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isPending: boolean;
}) {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );

  const t = useTranslations('scheduleAdd');

  useEffect(() => {
    setPortalContainer(document.getElementById('schedule-submit-button'));
  }, []);

  if (!portalContainer) {
    return null;
  }

  return createPortal(
    <div className="flex items-center justify-end">
      <SmallButton
        type="button"
        onClick={onClick}
        disabled={isPending}
        className={cn({ 'pointer-events-none': isPending })}
      >
        {isPending ? t('saving') : t('save')}
      </SmallButton>
    </div>,
    document.getElementById('schedule-submit-button') as HTMLElement,
  );
}
