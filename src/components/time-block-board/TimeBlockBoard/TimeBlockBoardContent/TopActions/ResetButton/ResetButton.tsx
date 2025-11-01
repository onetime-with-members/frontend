import { useTranslations } from 'next-intl';

import { RefreshIcon } from '@/components/icon';
import cn from '@/lib/cn';

export default function ResetButton({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  const t = useTranslations('timeBlockBoard');

  return (
    <button
      type="button"
      className={cn(
        'flex h-[2rem] items-center gap-1 rounded-full border border-gray-10 bg-gray-00 px-3 py-1 text-gray-40 text-sm-200',
        className,
      )}
      {...props}
    >
      <span className="text-[14px]">
        <RefreshIcon />
      </span>
      <span>{t('reset')}</span>
    </button>
  );
}
