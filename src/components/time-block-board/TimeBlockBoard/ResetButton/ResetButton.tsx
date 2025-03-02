import { useTranslation } from 'react-i18next';

import RefreshIcon from '@/components/icon/RefreshIcon';
import cn from '@/utils/cn';

interface ResetButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ResetButton({
  children,
  className,
  ...props
}: ResetButtonProps) {
  const { t } = useTranslation();

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
      <span>{t('timeBlockBoard.reset')}</span>
    </button>
  );
}
