import calendarImage from '../../../../assets/landing/hero-calendar.svg';

export default function TopContent() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="h-[152px] w-[152px]">
        <img src={calendarImage} alt="시계" className="h-full w-full" />
      </div>
      <p className="text-center text-gray-00 title-md-300">
        원타임에서 더 이상 스트레스 없는{' '}
        <br className="hidden min-[320px]:block" />
        간편한 일정조율을 경험하세요
      </p>
    </div>
  );
}
