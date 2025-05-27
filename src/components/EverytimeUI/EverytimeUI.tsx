import { useTranslations } from 'next-intl';

import EverytimeIcon from '@/components/icon/EverytimeIcon';
import cn from '@/lib/cn';
import { Link, useRouter } from '@/navigation';
import { IconPlus } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';

interface EverytimeUIProps {
  className?: string;
}

export default function EverytimeUI({ className }: EverytimeUIProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('myScheduleEdit');

  function handleEditButtonClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    router.push(e.currentTarget.getAttribute('href') || '#');
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between bg-[#FFF3F3] px-5 py-4 text-[#F91F15]',
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <EverytimeIcon size={20} />
        <span className="text-md-300">{t('everytime')}</span>
      </div>
      <Link
        href={`/mypage/schedules/everytime/edit?from=${pathname}`}
        onClick={handleEditButtonClick}
      >
        <IconPlus size={24} />
      </Link>
    </div>
  );
}
