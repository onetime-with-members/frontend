import {
  useEventQuery,
  useShortUrlQuery,
} from '@/features/event/api/events.query';
import { IconDots } from '@tabler/icons-react';
import { useParams } from 'next/navigation';

export default function ShareMoreButton() {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);
  const { data: shortenUrl } = useShortUrlQuery(window.location.href);

  function handleClick() {
    const shareData = {
      title: `${event?.title} - OneTime`,
      text: '스케줄 등록 요청이 도착했습니다.',
      url: shortenUrl || '',
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      alert('이 기능을 지원하지 않는 브라우저입니다.');
    }
  }

  return (
    <button
      className="rounded-full bg-gray-10 p-3 text-gray-40"
      onClick={handleClick}
    >
      <IconDots size={24} />
    </button>
  );
}
