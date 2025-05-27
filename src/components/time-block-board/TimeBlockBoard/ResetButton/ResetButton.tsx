import { useTranslations } from 'next-intl';

import RefreshIcon from '@/components/icon/refresh';
import cn from '@/lib/cn';

type UndoButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export default function ResetButton({ className, ...props }: UndoButtonProps) {
  const t = useTranslations('timeBlockBoard');

  return (
    <button
      className={cn(
        'flex h-[2rem] items-center gap-1 rounded-full border border-gray-10 bg-gray-00 px-3 py-1 text-gray-40 text-sm-200',
        className,
      )}
      {...props}
    >
      <span>
        <RefreshIcon size={14} fill="#9296AB" />
      </span>
      <span>{t('reset')}</span>
    </button>
  );
}
