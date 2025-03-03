import { useTranslations } from 'next-intl';

import RefreshIcon from '@/components/icon/RefreshIcon';
import cn from '@/utils/cn';

type ResetButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ResetButton({ className, ...props }: ResetButtonProps) {
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
