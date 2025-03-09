import { useTranslation } from 'react-i18next';

import LoadIcon from '@/components/icon/LoadIcon';
import cn from '@/utils/cn';

interface ReloadButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export default function ReloadButton({
  className,
  ...props
}: ReloadButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      className={cn(
        'flex h-8 items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-gray-00 text-sm-200',
        className,
      )}
      {...props}
    >
      <span>
        <LoadIcon size={16} />
      </span>
      <span>{t('timeBlockBoard.reload')}</span>
    </button>
  );
}
