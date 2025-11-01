import { useTranslations } from 'next-intl';

import cn from '@/lib/cn';
import { IconX } from '@tabler/icons-react';

export default function ClearButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const t = useTranslations('timeBlockBoard');

  return (
    <button
      type="button"
      className={cn(
        'flex h-[2rem] items-center gap-1 rounded-full border border-danger-50 bg-gray-00 px-3 py-1 text-danger-50 text-sm-200',
        className,
      )}
      {...props}
    >
      <span>
        <IconX size={16} />
      </span>
      <span>{t('clear')}</span>
    </button>
  );
}
