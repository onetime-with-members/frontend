import clockIcon from '../../../../assets/landing/typo-clock.svg';

export default function TypoSection() {
  return (
    <section className="flex flex-col items-center gap-3 py-24">
      <div>
        <img src={clockIcon} alt="시계 아이콘" />
      </div>
      <p className="text-center text-[1.625rem] font-bold text-primary-50">
        내 일정에 맞게 <br className="hidden min-[220px]:block" />
        자동으로 시간 조율, <br className="hidden min-[220px]:block" />더 이상
        고민하지 마세요!
      </p>
    </section>
  );
}
