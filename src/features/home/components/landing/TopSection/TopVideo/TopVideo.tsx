import { getLocale } from 'next-intl/server';

export default async function TopVideo() {
  const locale = await getLocale();

  return (
    <div className="relative flex h-[calc(350px+2.5rem)] flex-col items-center justify-end overflow-x-hidden">
      <div className="h-[350px] w-[350px]">
        <video autoPlay loop muted playsInline className="h-full w-full">
          <source
            src={`/videos/landing-phone-video-${locale === 'ko' ? 'ko' : 'en'}.mov`}
            type='video/mp4; codecs="hvc1"'
          />
          <source
            src={`/videos/landing-phone-video-${locale === 'ko' ? 'ko' : 'en'}.webm`}
            type="video/webm"
          />
        </video>
      </div>
      <div className="absolute bottom-0 left-1/2 -z-10 h-[825px] w-[825px] -translate-x-1/2 rounded-full bg-primary-10" />
    </div>
  );
}
