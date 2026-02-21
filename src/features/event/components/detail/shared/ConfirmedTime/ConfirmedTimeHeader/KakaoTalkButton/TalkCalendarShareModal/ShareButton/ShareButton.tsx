import { useTranslations } from 'next-intl';

import { KakaoTalkIcon } from '@/components/icon/KakaoTalkIcon';
import useTalkCalendarShare from '@/features/event/hooks/useTalkCalendarShare';
import { useParams } from 'next/navigation';

export default function ShareButton({ onClose }: { onClose: () => void }) {
  const params = useParams<{ id: string }>();
  const t = useTranslations('event.components.TalkCalendarShareModal');

  const shareTalkCalendar = useTalkCalendarShare(params.id);

  function handleClick() {
    shareTalkCalendar();
    onClose();
  }

  return (
    <button
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FAE100] p-3 text-[#3B1E1E] duration-150 text-md-300 hover:brightness-90"
      onClick={handleClick}
    >
      <span>
        <KakaoTalkIcon fontSize={24} innerfill="#FAE100" />
      </span>
      <span>{t('shareViaKakaoButton')}</span>
    </button>
  );
}
