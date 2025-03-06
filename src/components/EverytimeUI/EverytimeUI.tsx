import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import EverytimeIcon from '@/components/icon/EverytimeIcon';
import cn from '@/utils/cn';
import { IconPlus } from '@tabler/icons-react';

interface EverytimeUIProps {
  className?: string;
}

export default function EverytimeUI({ className }: EverytimeUIProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'flex items-center justify-between bg-[#FFF3F3] px-5 py-4 text-[#F91F15]',
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <EverytimeIcon size={20} />
        <span className="text-md-300">{t('myScheduleEdit.everytime')}</span>
      </div>
      <Link to="/mypage/schedules/everytime/edit">
        <IconPlus size={24} />
      </Link>
    </div>
  );
}
