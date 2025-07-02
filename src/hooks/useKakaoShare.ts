import { EventType } from '@/lib/types';

interface useKakaoShareProps {
  event: EventType | null | undefined;
}

export default function useKakaoShare({ event }: useKakaoShareProps) {
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
