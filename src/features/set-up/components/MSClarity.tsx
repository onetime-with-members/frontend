import { MS_CLARITY_ID } from '../constants';
import Script from 'next/script';

export default function MSClarity() {
  return (
    <Script
      id="microsoft-clarity-script"
      dangerouslySetInnerHTML={{
        __html: `
          (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };

            clarity('consentv2', {
              ad_Storage: 'denied',
              analytics_Storage: 'denied'
            });

            t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
          })(window, document, "clarity", "script", "${MS_CLARITY_ID}");`,
      }}
    />
  );
}
