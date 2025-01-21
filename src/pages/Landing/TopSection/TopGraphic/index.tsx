import clsx from 'clsx';
import { useEffect, useState } from 'react';

type DeviceOS = 'android' | 'iOS' | 'windows' | 'macOS';

export default function TopGraphic() {
  const [deviceOS, setDeviceOS] = useState<DeviceOS | undefined>(undefined);

  useEffect(() => {
    let deviceOS: DeviceOS | undefined = undefined;

    const userAgent = window.navigator.userAgent;
    if (userAgent.match(/Android/i)) {
      deviceOS = 'android';
    } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
      deviceOS = 'iOS';
    } else if (userAgent.match(/Windows/i)) {
      deviceOS = 'windows';
    } else if (userAgent.match(/Mac/i)) {
      deviceOS = 'macOS';
    }

    setDeviceOS(deviceOS);
  }, []);

  return (
    <div className="relative flex h-[350px] flex-col items-center justify-center overflow-x-hidden">
      <div
        className="h-[350px] w-[350px]"
        style={{ clipPath: 'circle(50% at 50% 50%)' }}
      >
        {deviceOS !== undefined && (
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
            'bg-[#C6CCF4]': deviceOS === 'android' || deviceOS === 'iOS',
            'bg-[#CED3F6]': deviceOS === 'macOS',
            'bg-[#C6CBF3]': deviceOS === 'windows',
          },
        )}
      />
    </div>
  );
}
