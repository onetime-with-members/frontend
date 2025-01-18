import ReactPlayer from 'react-player';

export default function TopGraphic() {
  return (
    <div className="relative flex h-[350px] flex-col items-center justify-center overflow-x-hidden">
      <div
        className="h-[350px] w-[350px]"
        style={{ clipPath: 'circle(50% at 50% 50%)' }}
      >
        <ReactPlayer
          url="/videos/landing-phone-video.mp4"
          playing
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
