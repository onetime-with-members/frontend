import { useEffect } from 'react';

import { EventType } from '../types/event.type';

const { Kakao } = window;

interface useKakaoShareProps {
  event: EventType | undefined;
}

export default function useKakaoShare({ event }: useKakaoShareProps) {
  useEffect(() => {
    Kakao.cleanup();
    Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
  }, []);

  function handleKakaoShare() {
    if (!event) return;

    const url = `${import.meta.env.VITE_SITE_DOMAIN}/events/${event.event_id}`;

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${event.title} - OneTime`,
        description: `스케줄 등록 요청이 도착했습니다.`,
        imageUrl: `${import.meta.env.VITE_SITE_DOMAIN}/images/kakao/kakaotalk-share-thumbnail.png`,
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

  return { handleKakaoShare };
}
