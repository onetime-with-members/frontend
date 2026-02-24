import { useTranslations } from 'next-intl';

import Button from '@/components/button';
import cn from '@/lib/cn';

export default function BottomButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  const t = useTranslations('event.pages.EventConfirmPage');

  return (
    <div className="sticky bottom-0 left-0 hidden w-full md:static md:mt-8 md:block md:w-[25rem] md:bg-transparent">
      <Button
        type="button"
        variant="dark"
        fullWidth
        className={cn({
          'pointer-events-none cursor-default': disabled,
        })}
        disabled={disabled}
        onClick={onClick}
      >
        {t('confirmButton')}
      </Button>
    </div>
  );
}
