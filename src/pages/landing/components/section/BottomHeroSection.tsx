import ClockPattern from '../../../../components/clock-pattern/ClockPattern';
import BottomButton from '../bottom-hero-section/BottomButton';
import TopContent from '../bottom-hero-section/TopContent';

export default function BottomHeroSection() {
  return (
    <section className="relative mt-10 w-full overflow-hidden bg-primary-40 px-4 pb-14 pt-20">
      <div className="relative z-10 flex flex-col items-center gap-16">
        <TopContent />
        <BottomButton />
      </div>
      <ClockPattern />
    </section>
  );
}
