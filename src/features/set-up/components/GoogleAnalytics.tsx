import { GA_ID } from '../constants';
import Script from 'next/script';

export default function GoogleAnalytics() {
  return (
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
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied'
          });

          gtag('js', new Date());
          gtag('config', '${GA_ID}');
          `,
        }}
      />
      <Script
        id="google-consent-init"
        dangerouslySetInnerHTML={{
          __html: `gtag('consent', 'default', { 'ad_storage': 'denied', 'ad_user_data': 'denied', 'ad_personalization': 'denied', 'analytics_storage': 'denied' });`,
        }}
      />
    </>
  );
}
