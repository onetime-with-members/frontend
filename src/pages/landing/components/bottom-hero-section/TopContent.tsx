import clockImage from '../../../../assets/landing/clock.png';

export default function TopContent() {
  return (
    <div className="flex flex-col items-center gap-9">
      <div className="h-[152px] w-[152px]">
        <img src={clockImage} alt="시계" className="h-full w-full" />
      </div>
      <p className="text-center text-gray-00 title-lg-300">
        일정을 생성하고 그룹원들과
        <br />
        쉽고 빠르게 스케줄을 맞춰봐요
      </p>
    </div>
  );
}
