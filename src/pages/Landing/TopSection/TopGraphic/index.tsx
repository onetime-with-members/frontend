import clsx from 'clsx';
import { useEffect, useState } from 'react';

export default function TopGraphic() {
  const [isMobile, setIsMobile] = useState(false);

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
    <div className="relative flex h-[450px] flex-col items-center overflow-x-hidden">
      <div
        className="h-[400px] w-[400px]"
        style={{ clipPath: 'circle(50% at 50% 50%)' }}
      >
        {isMobile && (
          <video
            src="/videos/landing-phone-video.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        )}
      </div>
      <div
        className={clsx(
          'absolute bottom-0 left-1/2 -z-10 h-[825px] w-[825px] -translate-x-1/2 rounded-full',
          {
            'bg-[#C8D0F9]': isMobile,
            'bg-[#CED3F6]': !isMobile,
          },
        )}
      />
    </div>
  );
}
