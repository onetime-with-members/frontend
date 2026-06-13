import { ADSENSE_CLIENT_ID } from '@/constants';
import Script from 'next/script';

export default function GoogleAdSense() {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    ></Script>
  );
}
