import { eventQueryOptions } from '@/features/event/api/events.option';
import useKakaoShare from '@/hooks/useKakaoShare';
import cn from '@/lib/cn';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function ShareKakaoButton({ size = 48 }: { size?: number }) {
  const params = useParams<{ id: string }>();

  const { data: event } = useQuery({ ...eventQueryOptions(params.id) });

  const { handleKakaoShare } = useKakaoShare({
    event,
  });

  return (
    <button
      className={cn(
        'overflow-hidden rounded-full bg-[#FFE80F] p-1.5 text-primary-40',
      )}
      onClick={handleKakaoShare}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/kakao-icon.svg"
        alt="카카오톡 아이콘"
        width={36}
        height={36}
      />
    </button>
  );
}
