import { useTranslations } from 'next-intl';

import { CalendarIcon } from '@/components/icon';
import { useProgressRouter } from '@/navigation';
import { IconChevronRight } from '@tabler/icons-react';
import { useParams } from 'next/navigation';

export default function ConfirmEventBanner() {
  const params = useParams<{ id: string }>();
  const t = useTranslations('event.pages.EventDetailPage.confirm');

  const progressRouter = useProgressRouter();

  async function handleClick() {
    progressRouter.push(`/events/${params.id}/confirm`);
  }

  return (
    <div
      className="flex cursor-pointer items-center gap-1.5 rounded-2xl bg-gray-70 px-4 py-3 text-gray-30"
      onClick={handleClick}
    >
      <span>
        <CalendarIcon innerfill="#474a5c" fontSize={20} />
      </span>
      <span className="flex-1 text-md-200">{t('banner')}</span>
      <span>
        <IconChevronRight size={24} />
      </span>
    </div>
  );
}
