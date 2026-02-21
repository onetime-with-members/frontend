import { useTranslations } from 'next-intl';

import ActionButton from './ActionButton';
import KakaoTalkButton from './KakaoTalkButton';
import { EditIcon, ShareIcon } from '@/components/icon';

export default function ConfirmedTimeHeader() {
  const t = useTranslations('event.pages.EventDetailPage.confirm');

  return (
    <div className="flex items-center justify-between pl-2 text-gray-00">
      <h2 className="text-md-300">{t('eventInfo')}</h2>
      <div className="flex flex-row items-center gap-[6px] text-xl">
        <KakaoTalkButton />
        <ActionButton>
          <ShareIcon />
        </ActionButton>
        <ActionButton>
          <EditIcon />
        </ActionButton>
      </div>
    </div>
  );
}
