import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import kakaoIcon from '../assets/kakao-icon.png';
import { EventType } from '../types/event.type';

declare global {
  interface Window {
    Kakao: any;
  }
}

interface ShareKakaoButtonProps {
  event: EventType;
}

const { Kakao } = window;

export default function ShareKakaoButton({ event }: ShareKakaoButtonProps) {
  const params = useParams<{ eventId: string }>();

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
  }, []);

  function handleClick() {
    const url = `${import.meta.env.VITE_SITE_DOMAIN}/events/${params.eventId}`;

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `'${event.title}'으로부터 스케줄 등록 요청이 도착했습니다. 내 스케줄을 등록하고 추천된 시간을 확인해보세요.`,
        imageUrl: `${import.meta.env.VITE_SITE_DOMAIN}/images/kakao/kakao-share-thumbnail.png`,
        link: {
          webUrl: url,
          mobileWebUrl: url,
        },
      },
      buttons: [
        {
          title: '스케줄 등록하러 가기',
          link: {
            webUrl: url,
            mobileWebUrl: url,
          },
        },
      ],
    });
  }

  return (
    <button
      className="h-12 w-12 rounded-full bg-[#FAE100] p-1.5 text-primary-40"
      onClick={handleClick}
    >
      <img src={kakaoIcon} alt="카카오톡 아이콘" />
    </button>
  );
}
