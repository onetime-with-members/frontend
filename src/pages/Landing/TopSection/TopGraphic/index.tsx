import { useRef } from 'react';

export default function TopGraphic() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="relative flex h-[500px] flex-col items-center justify-center overflow-x-hidden">
      <button onClick={handlePlay}>button</button>
      <div
        className="h-[350px] w-[350px]"
        style={{ clipPath: 'circle(50% at 50% 50%)' }}
      >
        <video
          ref={videoRef}
          src="/videos/landing-phone-video.mp4"
          autoPlay
          loop
          muted
          width="100%"
          height="100%"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="absolute bottom-0 left-1/2 -z-10 h-[825px] w-[825px] -translate-x-1/2 rounded-full bg-[#CFD6FA]" />
    </div>
  );
}
