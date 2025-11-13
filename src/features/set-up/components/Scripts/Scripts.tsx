'use client';

import GoogleAnalytics from './GoogleAnalytics';
import GoogleTagManager from './GoogleTagManager';
import KakaoShareScript from './KakaoShareScript';
import MSClarity from './MSClarity';
import MetaPixel from './MetaPixel';

export default function Scripts() {
  return (
    <>
      <GoogleAnalytics />
      <MSClarity />
      <MetaPixel />
      <GoogleTagManager />
      <KakaoShareScript />
    </>
  );
}
