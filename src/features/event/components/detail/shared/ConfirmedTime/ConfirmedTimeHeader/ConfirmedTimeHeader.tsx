import { useTranslations } from 'next-intl';

import EditButton from './EditButton';
import KakaoTalkButton from './KakaoTalkButton';
import ShareButton from './ShareButton';

export default function ConfirmedTimeHeader() {
  const t = useTranslations('event.pages.EventDetailPage.confirm');

  return (
    <div className="flex items-center justify-between pl-2 text-gray-30">
      <h2 className="text-md-300">{t('confirmedDate')}</h2>
      <div className="flex flex-row items-center gap-1.5 text-xl">
        <KakaoTalkButton />
        <ShareButton />
        <EditButton />
      </div>
    </div>
  );
}
