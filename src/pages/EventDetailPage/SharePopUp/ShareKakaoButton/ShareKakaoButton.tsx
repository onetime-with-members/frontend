import { useParams } from 'react-router-dom';

import kakaoIcon from '@/assets/kakao-icon.svg';
import useKakaoShare from '@/hooks/useKakaoShare';
import { useEventQuery } from '@/queries/event.queries';
import cn from '@/utils/cn';

declare global {
  interface Window {
    Kakao: any;
  }
}

interface ShareKakaoButtonProps {
  size?: number;
}

export default function ShareKakaoButton({ size = 48 }: ShareKakaoButtonProps) {
  const params = useParams<{ eventId: string }>();

  const { data: event } = useEventQuery(params.eventId);

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
      <img src={kakaoIcon} alt="카카오톡 아이콘" />
    </button>
  );
}
