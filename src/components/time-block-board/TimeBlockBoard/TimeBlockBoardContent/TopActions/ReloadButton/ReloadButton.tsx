import { useTranslations } from 'next-intl';

import { LoadIcon } from '@/components/icon';
import cn from '@/lib/cn';

export default function ReloadButton({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  const t = useTranslations();

  return (
    <button
      type="button"
      className={cn(
        'flex h-8 items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-gray-00 text-sm-200',
        className,
      )}
      {...props}
    >
      <span>
        <LoadIcon fontSize={16} />
      </span>
      <span>{t('timeBlockBoard.reload')}</span>
    </button>
  );
}
