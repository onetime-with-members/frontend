'use client';

import { useTranslations } from 'next-intl';

import { EverytimeIcon } from '@/components/icon';
import { usePathname } from '@/i18n/navigation';
import cn from '@/lib/cn';
import { ProgressLink } from '@/navigation';
import { IconPlus } from '@tabler/icons-react';

export default function EverytimeUI({ className }: { className?: string }) {
  const pathname = usePathname();
  const t = useTranslations('myScheduleEdit');

  return (
    <div
      className={cn(
        'flex items-center justify-between bg-[#FFF3F3] px-5 py-4 text-[#F91F15]',
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <EverytimeIcon fontSize={20} />
        <span className="text-md-300">{t('everytime')}</span>
      </div>
      <ProgressLink href={`/mypage/schedule/everytime/edit?from=${pathname}`}>
        <IconPlus size={24} />
      </ProgressLink>
    </div>
  );
}
