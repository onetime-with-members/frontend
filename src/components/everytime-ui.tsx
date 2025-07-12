'use client';

import { useTranslations } from 'next-intl';

import EverytimeIcon from '@/components/icon/everytime';
import cn from '@/lib/cn';
import { ProgressLink, useProgressRouter } from '@/navigation';
import { IconPlus } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';

export default function EverytimeUI({ className }: { className?: string }) {
  const progressRouter = useProgressRouter();
  const pathname = usePathname();
  const t = useTranslations('myScheduleEdit');

  function handleEditButtonClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    progressRouter.push(e.currentTarget.getAttribute('href') || '#');
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
      <ProgressLink
        href={`/mypage/schedule/everytime/edit?from=${pathname}`}
        onClick={handleEditButtonClick}
      >
        <IconPlus size={24} />
      </ProgressLink>
    </div>
  );
}
