import phoneVideo from '@/assets/video/landing-phone-video.mp4';

export default function TopGraphic() {
  return (
    <div className="relative flex h-[400px] flex-col items-center justify-center overflow-x-hidden">
      <div
        className="h-[400px] w-[400px]"
        style={{ clipPath: 'circle(50% at 50% 50%)' }}
      >
        <video src={phoneVideo} autoPlay loop muted className="h-full w-full" />
      </div>
      <div className="absolute bottom-0 left-1/2 -z-10 h-[825px] w-[825px] -translate-x-1/2 rounded-full bg-[#CFD6FA]" />
    </div>
  );
}
