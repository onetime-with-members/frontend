import { useTranslations } from 'next-intl';

import useShortUrl from '../useShortUrl';
import { EventType } from '@/features/event/types';

export default function useKakaoShare({
  event,
}: {
  event: EventType | null | undefined;
}) {
  const t = useTranslations('event.pages.EventDetailPage.kakaoShare.schedule');

  const shortUrl = useShortUrl();

  function handleKakaoShare() {
    if (!event || !shortUrl) return;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${event.title} | OneTime`,
        description: t('description'),
        imageUrl: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/images/kakao/kakaotalk-share-thumbnail.png`,
        imageWidth: 1200,
        imageHeight: 630,
        link: {
          webUrl: shortUrl,
          mobileWebUrl: shortUrl,
        },
      },
      buttons: [
        {
          title: t('linkButton'),
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
