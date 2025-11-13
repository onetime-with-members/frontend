import BottomCTAButton from './BottomCTAButton';
import BottomContent from './BottomContent';
import ClockPattern from '@/components/ClockPattern';

export default async function BottomSection() {
  return (
    <section className="relative mt-10 w-full overflow-hidden bg-primary-40 px-4 pb-14 pt-20">
      <div className="relative z-10 flex flex-col items-center gap-16">
        <BottomContent />
        <BottomCTAButton />
      </div>
      <ClockPattern gap={14} />
    </section>
  );
}
