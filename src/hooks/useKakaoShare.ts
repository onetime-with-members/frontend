import { useEffect } from 'react';

import { EventType } from '../types/event.type';

interface useKakaoShareProps {
  event: EventType | undefined;
}

export default function useKakaoShare({ event }: useKakaoShareProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { Kakao } = window;

      Kakao.cleanup();
      Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }, []);

  function handleKakaoShare() {
    if (!event) return;

    const url = `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/events/${event.event_id}`;

    const { Kakao } = window;

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${event.title} - OneTime`,
        description: `스케줄 등록 요청이 도착했습니다.`,
        imageUrl: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/images/kakao/kakaotalk-share-thumbnail.png`,
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
