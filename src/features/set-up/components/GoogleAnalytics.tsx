'use client';

import { DENIED, GA_ID, GRANTED } from '../constants';
import useConsentMode from '../hooks/useConsentMode';
import Script from 'next/script';

export default function GoogleAnalytics() {
  const { isAccepted, isLoading } = useConsentMode();

  return (
    !isLoading && (
      <>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <Script
          id="google-analytics-script"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }

          gtag('consent', 'default', {
            'ad_storage': '${isAccepted ? GRANTED : DENIED}',
            'ad_user_data': '${isAccepted ? GRANTED : DENIED}',
            'ad_personalization': '${isAccepted ? GRANTED : DENIED}',
            'analytics_storage': '${isAccepted ? GRANTED : DENIED}'
          });

          gtag('js', new Date());
          gtag('config', '${GA_ID}');
          `,
          }}
        />
      </>
    )
  );
}
