import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import kakaoIcon from '../assets/kakao-icon.png';

declare global {
  interface Window {
    Kakao: any;
  }
}

const { Kakao } = window;

export default function ShareKakaoButton() {
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
        title: '오늘의 디저트',
        description: '아메리카노, 빵, 케익',
        imageUrl:
          'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
        link: {
          webUrl: url,
          mobileWebUrl: url,
        },
      },
      buttons: [
        {
          title: '나도 테스트 하러가기',
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
