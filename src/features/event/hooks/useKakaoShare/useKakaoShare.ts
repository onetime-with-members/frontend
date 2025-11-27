import { useShortUrlQuery } from '@/features/event/api/event.query';
import { EventType } from '@/features/event/types';

export default function useKakaoShare({
  event,
}: {
  event: EventType | null | undefined;
}) {
  const { data: shortUrl } = useShortUrlQuery(window.location.href);

  function handleKakaoShare() {
    if (!event || !shortUrl) return;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${event.title} - OneTime`,
        description: `스케줄 등록 요청이 도착했습니다.`,
        imageUrl: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/images/kakao/kakaotalk-share-thumbnail.png`,
        link: {
          webUrl: shortUrl,
          mobileWebUrl: shortUrl,
        },
      },
      buttons: [
        {
          title: '스케줄 등록하러 가기',
          link: {
            webUrl: shortUrl,
            mobileWebUrl: shortUrl,
          },
        },
      ],
    });
  }

  return { handleKakaoShare };
}
