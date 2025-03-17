import Script from 'next/script';

export default function GAScript() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-8BKF2RFBH6"
      />
      <Script
        id="google-analytics-script"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'G-8BKF2RFBH6');`,
        }}
      />
    </>
  );
}
