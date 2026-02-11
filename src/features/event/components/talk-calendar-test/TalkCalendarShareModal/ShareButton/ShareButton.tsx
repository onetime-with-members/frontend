import { KakaoTalkIcon } from '@/components/icon/KakaoTalkIcon';
import useTalkCalendarShare from '@/features/event/hooks/useTalkCalendarShare';
import { useParams } from 'next/navigation';

export default function ShareButton() {
  const params = useParams<{ id: string }>();

  const shareTalkCalendar = useTalkCalendarShare(params.id);

  return (
    <button
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FAE100] p-3 text-[#3B1E1E] text-md-300"
      onClick={shareTalkCalendar}
    >
      <span>
        <KakaoTalkIcon fontSize={24} innerfill="#FAE100" />
      </span>
      <span>카카오톡으로 공유하기</span>
    </button>
  );
}
