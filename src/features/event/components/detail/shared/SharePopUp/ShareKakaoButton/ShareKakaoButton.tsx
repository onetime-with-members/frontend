import { KakaoTalkIcon } from '@/components/icon/KakaoTalkIcon';
import { useEventQuery } from '@/features/event/api/event.query';
import useKakaoShare from '@/features/event/hooks/useKakaoShare';
import cn from '@/lib/cn';
import { useParams } from 'next/navigation';

export default function ShareKakaoButton({ size = 48 }: { size?: number }) {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  const { handleKakaoShare } = useKakaoShare({
    event,
  });

  return (
    <button
      className={cn(
        'overflow-hidden rounded-full bg-[#FFE80F] p-1.5 text-[#3B1E1E]',
      )}
      onClick={handleKakaoShare}
      style={{ width: size, height: size }}
    >
      <KakaoTalkIcon fontSize={36} innerfill="#FFE80F" />
    </button>
  );
}
