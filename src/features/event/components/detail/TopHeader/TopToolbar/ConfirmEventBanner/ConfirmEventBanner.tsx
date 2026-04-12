import { useTranslations } from 'next-intl';

import { CalendarIcon } from '@/components/icon';
import cn from '@/lib/cn';
import { useProgressRouter } from '@/navigation';
import { IconChevronRight } from '@tabler/icons-react';
import { useParams } from 'next/navigation';

export default function ConfirmEventBanner({
  className,
}: {
  className?: string;
}) {
  const params = useParams<{ id: string }>();
  const t = useTranslations('event.pages.EventDetailPage.confirm');

  const progressRouter = useProgressRouter();

  function handleClick() {
    progressRouter.push(`/events/${params.id}/confirm`);
  }

  return (
    <button
      className={cn(
        'flex w-full items-center gap-1.5 rounded-2xl bg-primary-50 px-4 py-3 text-start text-gray-00 [--cal-icon-inner:#4C65E5]',
        className,
      )}
      onClick={handleClick}
    >
      <span className="shrink-0">
        <CalendarIcon innerfill="var(--cal-icon-inner)" fontSize={20} />
      </span>
      <span className="flex-1 text-md-200">{t('banner')}</span>
      <span>
        <IconChevronRight size={24} />
      </span>
    </button>
  );
}
