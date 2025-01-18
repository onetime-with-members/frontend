import clsx from 'clsx';
import { useEffect, useState } from 'react';

export default function TopGraphic() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent;
      if (/android/i.test(userAgent) || /iPhone|iPad|iPod/i.test(userAgent)) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkDevice();
  }, []);

  return (
    <div className="relative flex h-[350px] flex-col items-center justify-center overflow-x-hidden">
      <div
        className="h-[350px] w-[350px]"
        style={{ clipPath: 'circle(50% at 50% 50%)' }}
      >
        {isMobile !== undefined && (
          <video
            src="/videos/landing-phone-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-contain"
          />
        )}
      </div>
      <div
        className={clsx(
          'absolute bottom-0 left-1/2 -z-10 h-[825px] w-[825px] -translate-x-1/2 rounded-full',
          {
            'bg-[#C6CCF4]': isMobile,
            'bg-[#CED3F6]': !isMobile,
          },
        )}
      />
    </div>
  );
}
