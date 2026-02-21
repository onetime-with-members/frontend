import Script from 'next/script';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

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
