'use client';

import Script from 'next/script';

export default function KakaoShareScript() {
  function onLoad() {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
  }

  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      onLoad={onLoad}
    />
  );
}
