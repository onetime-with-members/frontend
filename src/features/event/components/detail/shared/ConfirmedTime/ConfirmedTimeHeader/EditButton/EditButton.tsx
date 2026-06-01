import { useTranslations } from 'next-intl';

import ActionButton from '../ActionButton';
import { EditIcon } from '@/components/icon';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function EditButton() {
  const params = useParams<{ id: string }>();

  const t = useTranslations('event.pages.EventDetailPage.confirm');

  const progressRouter = useProgressRouter();

  function handleClick() {
    progressRouter.push(`/events/${params.id}/confirm`);
  }

  return (
    <ActionButton className='flex flex-row items-center gap-1 pl-[10px] pr-3 h-9 rounded-lg bg-gray-70 w-full justify-center' onClick={handleClick}>
      <EditIcon />
      <span className='text-sm-200 text-gray-00'>{t('edit')}</span>
    </ActionButton>
  );
}
